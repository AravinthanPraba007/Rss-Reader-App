import axiosInstance from "../Helpers/axiosInstance"

export const login = ({email, password}) => {

    return axiosInstance().post("/login",{
        email: email,
        password: password
    })
    .then((res) => {
        localStorage.token = res.data.token;
        return Promise.resolve();
    })
    .catch((err) => {
        console.log(err);
        return Promise.reject();
    })
    
}
