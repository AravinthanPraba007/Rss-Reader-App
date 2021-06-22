import axios from "axios"

export default () => {
    const baseURL = "http://localhost:8080";
    let headers = {};

    if (localStorage.token) {
        headers.Authorization = `${localStorage.token}`;
    }

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: headers
    });

    axiosInstance.interceptors.response.use(
        (response) => {
            console.log(response)
            return Promise.resolve(response);
        },
        (error) => {
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                if (window.location.pathname !== '/login')
                    window.location.href = '/login';
            }
            if (error) {
                return Promise.reject(error.response);
            }
        }
    )
    return axiosInstance;
}
