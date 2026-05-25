import axios from "axios";

// ─── Constants ───────────────────────────────────────────────────────────────

const BASE_URL = "https://autonext-gateway-dev.services.azurewebsites.betalen.in/api/v1";
const AUTH_REFRESH_URL = `${BASE_URL}/auth/refresh`;
const HTTP_STATUS = { UNAUTHORIZED: 401 };

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
    const flush = (error, token = null) => { queue.forEach(({ resolve, reject }) => error ? reject(error) : resolve(token)); queue = []; };
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
const attachToken = (config, token) => { config.headers = config.headers ?? {}; config.headers.Authorization = `Bearer ${token}`; return config; };
const redirectToLogin = () => { window.location.href = "/login"; };

// ─── Request Interceptor ──────────────────────────────────────────────────────

apiClient.interceptors.request.use(
    (config) => { const token = tokenStore.get(); if (token && !isAuthEndpoint(config.url)) { attachToken(config, token); } return config; },
    (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const shouldRefresh = error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry && !isAuthEndpoint(originalRequest.url);

        if (!shouldRefresh) return Promise.reject(error);

        if (refreshQueue.isRefreshing()) {
            return new Promise((resolve, reject) => { refreshQueue.add(resolve, reject); }).then((token) => { attachToken(originalRequest, token); return apiClient(originalRequest); });
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
);

export default apiClient;