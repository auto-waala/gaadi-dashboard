import axios from "axios";

// ─── Constants ───────────────────────────────────────────────────────────────

const BASE_URL = "https://autonext-gateway-dev.services.azurewebsites.betalen.in/api/v1";
const AUTH_REFRESH_URL = `${BASE_URL}/auth/refresh`;
const HTTP_STATUS = { UNAUTHORIZED: 401, TOO_MANY_REQUESTS: 429, SERVER_ERROR: 500 };

// Retry configuration
const RETRY_CONFIG = {
    maxRetries: 3,
    retryDelay: 1000, // 1 second base delay
    retryStatusCodes: [408, 429, 500, 502, 503, 504], // Retry on these status codes
    retryMethods: ['GET', 'PUT', 'DELETE'], // Don't retry POST/PATCH by default (idempotent)
};

// ─── Token Store (encapsulated) ───────────────────────────────────────────────

const tokenStore = (() => {
    let accessToken = null;
    return {
        get: () => accessToken,
        set: (token) => { accessToken = token; },
        clear: () => { accessToken = null; },
    };
})();

export const setAccessToken = tokenStore.set;
export const clearAccessToken = tokenStore.clear;
export const getAccessToken = tokenStore.get;

// ─── Refresh Queue ────────────────────────────────────────────────────────────

const refreshQueue = (() => {
    let isRefreshing = false;
    let queue = [];
    const flush = (error, token = null) => { 
        queue.forEach(({ resolve, reject }) => error ? reject(error) : resolve(token)); 
        queue = []; 
    };
    return {
        isRefreshing: () => isRefreshing,
        setRefreshing: (val) => { isRefreshing = val; },
        add: (resolve, reject) => queue.push({ resolve, reject }),
        flush,
    };
})();

// ─── Axios Instance ───────────────────────────────────────────────────────────

const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 15_000,
    headers: { "Content-Type": "application/json" },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

const isAuthEndpoint = (url = "") => url.includes("/auth/");
const attachToken = (config, token) => { 
    config.headers = config.headers ?? {}; 
    config.headers.Authorization = `Bearer ${token}`; 
    return config; 
};
const redirectToLogin = () => { 
    window.location.href = "/login"; 
};

// ─── Retry Helper ─────────────────────────────────────────────────────────────

const shouldRetry = (error, retryCount) => {
    // Don't retry if we've exceeded max retries
    if (retryCount >= RETRY_CONFIG.maxRetries) return false;
    
    // Don't retry auth endpoints
    if (isAuthEndpoint(error.config?.url)) return false;
    
    // Don't retry non-idempotent methods by default
    if (!RETRY_CONFIG.retryMethods.includes(error.config?.method?.toUpperCase())) return false;
    
    // Retry on network errors
    if (!error.response) return true;
    
    // Retry on specific status codes
    return RETRY_CONFIG.retryStatusCodes.includes(error.response.status);
};

const getRetryDelay = (retryCount) => {
    // Exponential backoff: 1s, 2s, 4s
    return RETRY_CONFIG.retryDelay * Math.pow(2, retryCount - 1);
};

// ─── Request Interceptor ──────────────────────────────────────────────────────

apiClient.interceptors.request.use(
    (config) => { 
        const token = tokenStore.get(); 
        if (token && !isAuthEndpoint(config.url)) { 
            attachToken(config, token); 
        } 
        return config; 
    },
    (error) => Promise.reject(error)
);

// ─── Response Interceptor with Retry Logic ─────────────────────────────────────

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Initialize retry count if not exists
        if (originalRequest._retryCount === undefined) {
            originalRequest._retryCount = 0;
        }
        
        // ─── Handle 401 Unauthorized (Token Refresh) ──────────────────────
        const isUnauthorized = error.response?.status === HTTP_STATUS.UNAUTHORIZED;
        const shouldRefreshToken = isUnauthorized && !originalRequest._retry && !isAuthEndpoint(originalRequest.url);
        
        if (shouldRefreshToken) {
            if (refreshQueue.isRefreshing()) {
                return new Promise((resolve, reject) => { 
                    refreshQueue.add(resolve, reject); 
                }).then((token) => { 
                    attachToken(originalRequest, token); 
                    return apiClient(originalRequest); 
                });
            }
            
            originalRequest._retry = true;
            refreshQueue.setRefreshing(true);
            
            try {
                const { data } = await axios.post(AUTH_REFRESH_URL, {}, { withCredentials: true });
                const newToken = data.accessToken;
                tokenStore.set(newToken);
                refreshQueue.flush(null, newToken);
                attachToken(originalRequest, newToken);
                return apiClient(originalRequest);
            } catch (refreshError) {
                refreshQueue.flush(refreshError, null);
                tokenStore.clear();
                redirectToLogin();
                return Promise.reject(refreshError);
            } finally {
                refreshQueue.setRefreshing(false);
            }
        }
        
        // ─── Handle General Retries (Network errors, 5xx, 429) ─────────────
        if (shouldRetry(error, originalRequest._retryCount)) {
            originalRequest._retryCount++;
            
            const delay = getRetryDelay(originalRequest._retryCount);
            console.log(`Retrying request (${originalRequest._retryCount}/${RETRY_CONFIG.maxRetries}) after ${delay}ms`, {
                url: originalRequest.url,
                method: originalRequest.method,
                status: error.response?.status
            });
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, delay));
            
            // Retry the request
            return apiClient(originalRequest);
        }
        
        // ─── No retry, reject with error ───────────────────────────────────
        return Promise.reject(error);
    }
);

export default apiClient;