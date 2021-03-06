import axiosInstance from "../Helpers/axiosInstance"

export const signup = ({ name, email, password }) => {
    return axiosInstance().post("/signup", {
        name: name,
        email: email,
        password: password
    })
        .then((res) => {
            localStorage.token = res.data.token;
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        })
}

export const googleSignup = (token) => {
    return axiosInstance().post("/googleSignup", {
        token: token
    })
        .then((res) => {
            localStorage.token = res.data.token;
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err);
        })
}
