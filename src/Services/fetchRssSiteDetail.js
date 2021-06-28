import axiosInstance from "../Helpers/axiosInstance";

export const fetchRssSiteDetails = (rssId) => {
    return axiosInstance().post("/getRssSiteDetails", {
        rssId: rssId
    })
        .then((res) => {
            return Promise.resolve(res.data.rssSite);
        })
        .catch((err) => {
            console.log(err);
        })
}
