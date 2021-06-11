import axiosInstance from "../Helpers/axiosInstance";

export const fetchRssSites = (params) => {
    return axiosInstance().get("/getAvailableRssSites")
    .then((res) => {
        return Promise.resolve(res.data.rssSiteList);
    })
    .catch((err) => {
        console.log(err);
    })
}
