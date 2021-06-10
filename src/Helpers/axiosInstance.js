import axios from "axios"

export default (params) => {
    
    const baseURL = "http://localhost:8080";
    let headers = {};

    if(localStorage.token) {
        headers.Authorization = `${localStorage.token}`;
    }

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers: headers
    });

    return axiosInstance;
}
