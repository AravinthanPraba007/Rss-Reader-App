import axiosInstance from "../../Helpers/axiosInstance"

export const login = ({email, password}) => {

    axiosInstance().post("/login",{
        email: email,
        password: password
    })
    .then((res) => {
        console.log(res.data.token);
    })
    .catch((err) => {
        console.log(err);
    })
    
}
