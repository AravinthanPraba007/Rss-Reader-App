import axiosInstance from "../../Helpers/axiosInstance";

export const fetchRssSites = (params) => {
    return axiosInstance().get("/getAvailableRssSites")
    .then((res) => {
        console.log(res.data);
        return Promise.resolve(res.data.rssSiteList);
    })
    .catch((err) => {
        console.log(err);
    })
}
