import axiosInstance from "../../Helpers/axiosInstance"

export const signup = ({name, email, password}) => {

    axiosInstance().post("/signup",{
        name: name,
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
