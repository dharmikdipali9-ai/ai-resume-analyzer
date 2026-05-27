import axios from 'axios'

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

// =========================
// REQUEST INTERCEPTOR
// =========================

API.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem('access')

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`
        }

        return config
    },

    (error) => Promise.reject(error)
)

// =========================
// RESPONSE INTERCEPTOR
// =========================

API.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config

        // Token expired
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true

            try {

                const refresh =
                    localStorage.getItem('refresh')

                // Get new access token
                const res = await axios.post(
                    'http://127.0.0.1:8000/api/users/refresh/',
                    {
                        refresh
                    }
                )

                const newAccess = res.data.access

                // Save new token
                localStorage.setItem(
                    'access',
                    newAccess
                )

                // Retry original request
                originalRequest.headers.Authorization =
                    `Bearer ${newAccess}`

                return API(originalRequest)

            } catch (refreshError) {

                // Refresh token expired
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                localStorage.removeItem('user')
                localStorage.removeItem('resume_id')

                window.location.href = '/login'
            }
        }

        return Promise.reject(error)
    }
)

export default API