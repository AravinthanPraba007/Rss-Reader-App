import axiosInstance from "../Helpers/axiosInstance";

export const fetchUserFeeds = (page) => {
    return axiosInstance().post("/getUserFeeds",{
        page: page
    })
    .then((res) => {
        return Promise.resolve(res.data.feeds);
    })
    .catch((err) => {
        console.log(err);
    })
}
