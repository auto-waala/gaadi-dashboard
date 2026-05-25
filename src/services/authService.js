// api/authService.js

import apiClient, { setAccessToken, clearAccessToken, getAccessToken } from "./apiClient";

const authService = {
    // Login - token is automatically set by apiClient interceptor
    async login(data) {
        try {
            const response = await apiClient.post("/auth/login", data);
            
            // Handle the response structure: response.data contains the API response
            const apiResponse = response.data;
            
            if (apiResponse.success && apiResponse.data) {
                // Store the access token
                if (apiResponse.data.accessToken) {
                    setAccessToken(apiResponse.data.accessToken);
                }
                
                // Store user data - transform to match your AuthUser type
                if (apiResponse.data.user) {
                    const user = {
                        id: apiResponse.data.user.id,
                        email: apiResponse.data.user.email,
                        first_name: apiResponse.data.user.firstName || apiResponse.data.user.first_name,
                        last_name: apiResponse.data.user.lastName || apiResponse.data.user.last_name,
                        phone: apiResponse.data.user.phoneNumber || apiResponse.data.user.phone,
                        userType: apiResponse.data.user.userType,
                        emailVerified: apiResponse.data.user.emailVerified
                    };
                    localStorage.setItem("user", JSON.stringify(user));
                }
                
                return apiResponse.data;
            }
            
            throw new Error(apiResponse.message || "Login failed");
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    },

    // Register new user
    async register(data) {
        try {
            const response = await apiClient.post("/auth/register", data);
            const apiResponse = response.data;
            
            if (apiResponse.success && apiResponse.data) {
                if (apiResponse.data.accessToken) {
                    setAccessToken(apiResponse.data.accessToken);
                }
                
                if (apiResponse.data.user) {
                    const user = {
                        id: apiResponse.data.user.id,
                        email: apiResponse.data.user.email,
                        first_name: apiResponse.data.user.firstName || apiResponse.data.user.first_name,
                        last_name: apiResponse.data.user.lastName || apiResponse.data.user.last_name,
                        phone: apiResponse.data.user.phoneNumber || apiResponse.data.user.phone,
                        userType: apiResponse.data.user.userType
                    };
                    localStorage.setItem("user", JSON.stringify(user));
                }
                
                return apiResponse.data;
            }
            
            throw new Error(apiResponse.message || "Registration failed");
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    },

    // Google Login
    async googleLogin(data) {
        try {
            const response = await apiClient.post("/auth/google", data);
            const apiResponse = response.data;
            
            if (apiResponse.success && apiResponse.data) {
                if (apiResponse.data.accessToken) {
                    setAccessToken(apiResponse.data.accessToken);
                }
                
                if (apiResponse.data.user) {
                    const user = {
                        id: apiResponse.data.user.id,
                        email: apiResponse.data.user.email,
                        first_name: apiResponse.data.user.firstName || apiResponse.data.user.first_name,
                        last_name: apiResponse.data.user.lastName || apiResponse.data.user.last_name,
                        phone: apiResponse.data.user.phoneNumber || apiResponse.data.user.phone,
                        userType: apiResponse.data.user.userType
                    };
                    localStorage.setItem("user", JSON.stringify(user));
                }
                
                return apiResponse.data;
            }
            
            throw new Error(apiResponse.message || "Google login failed");
        } catch (error) {
            console.error("Google login failed:", error);
            throw error;
        }
    },

    // Logout
    async logout() {
        try {
            // Call logout endpoint to invalidate refresh token on server
            await apiClient.post("/auth/logout");
        } catch (error) {
            console.error("Logout API error:", error);
        } finally {
            // Clear all auth data regardless of API response
            clearAccessToken();
            localStorage.removeItem("user");
            sessionStorage.clear(); // Clear any sensitive session data
        }
    },

    // Refresh token (called by apiClient interceptor automatically)
    async refreshToken() {
        try {
            // This uses the refresh endpoint with httpOnly cookie
            const response = await apiClient.post("/auth/refresh", {});
            const apiResponse = response.data;
            
            if (apiResponse.success && apiResponse.data?.accessToken) {
                setAccessToken(apiResponse.data.accessToken);
                
                // Update user data if provided
                if (apiResponse.data.user) {
                    const user = {
                        id: apiResponse.data.user.id,
                        email: apiResponse.data.user.email,
                        first_name: apiResponse.data.user.firstName || apiResponse.data.user.first_name,
                        last_name: apiResponse.data.user.lastName || apiResponse.data.user.last_name,
                        phone: apiResponse.data.user.phoneNumber || apiResponse.data.user.phone,
                        userType: apiResponse.data.user.userType
                    };
                    localStorage.setItem("user", JSON.stringify(user));
                }
                
                return apiResponse.data;
            }
            
            throw new Error("Token refresh failed");
        } catch (error) {
            clearAccessToken();
            localStorage.removeItem("user");
            throw error;
        }
    },

    // Change password
    async changePassword(data) {
        try {
            const response = await apiClient.post("/auth/change-password", data);
            const apiResponse = response.data;
            
            if (!apiResponse.success) {
                throw new Error(apiResponse.message || "Password change failed");
            }
            
            return apiResponse;
        } catch (error) {
            console.error("Change password failed:", error);
            throw error;
        }
    },

    // Forgot password - request reset link/OTP
    async forgotPassword(email) {
        try {
            const response = await apiClient.post("/auth/forgot-password", { email });
            const apiResponse = response.data;
            
            if (!apiResponse.success) {
                throw new Error(apiResponse.message || "Forgot password request failed");
            }
            
            return apiResponse;
        } catch (error) {
            console.error("Forgot password request failed:", error);
            throw error;
        }
    },

    // Reset password with token
    async resetPassword(data) {
        try {
            const response = await apiClient.post("/auth/reset-password", data);
            const apiResponse = response.data;
            
            if (!apiResponse.success) {
                throw new Error(apiResponse.message || "Password reset failed");
            }
            
            return apiResponse;
        } catch (error) {
            console.error("Reset password failed:", error);
            throw error;
        }
    },

    // Send verification OTP
    async sendVerificationOtp(email, purpose = "verification") {
        try {
            const response = await apiClient.post("/auth/send-verification-otp", { email, purpose });
            const apiResponse = response.data;
            
            if (!apiResponse.success) {
                throw new Error(apiResponse.message || "Failed to send OTP");
            }
            
            return apiResponse;
        } catch (error) {
            console.error("Send OTP failed:", error);
            throw error;
        }
    },

    // Verify OTP
    async verifyOtp(data) {
        try {
            const response = await apiClient.post("/auth/verify-otp", data);
            const apiResponse = response.data;
            
            if (!apiResponse.success) {
                throw new Error(apiResponse.message || "OTP verification failed");
            }
            
            return apiResponse;
        } catch (error) {
            console.error("OTP verification failed:", error);
            throw error;
        }
    },

    // Get current user from stored data
    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
        return null;
    },

    // Check if user is authenticated
    isAuthenticated() {
        const token = getAccessToken();
        return !!token;
    },

    // Update user data in storage
    updateUserData(user) {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    },

    // Clear all auth data
    clearAuthData() {
        clearAccessToken();
        localStorage.removeItem("user");
    }
};

export default authService;