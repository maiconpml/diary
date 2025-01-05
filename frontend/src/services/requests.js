import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/api/'

const api = axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
})

api.interceptors.response.use(
    (response) => response,
    async error => {
        const original_request = error.config

        if(error.response?.status === 401 && !original_request._retry) {
            original_request._retry = true

            try {
                await refreshToken()
                return api(original_request)
            }catch(refreshError){
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

const refreshToken = async () => {
    const response = await api.post('/token/refresh/')
    return response.data
}

export const login = async (username, password) => {
    const response = await api.post('/token/', {username, password})
    return response.data
}

export const register = async (username, email, firstName, password) => {
    const response = await api.post('/register/', {username:username, email:email, first_name:firstName, password:password})
    return response.data
}

export const logout = async () => {
    const response = await api.post('/logout/')
    return response.data
}

export const getAuth = async () => {
    const response = await api.post('/authenticated/')
    return response.data
}