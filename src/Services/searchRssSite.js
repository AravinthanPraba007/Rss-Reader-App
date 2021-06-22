import axiosInstance from "../Helpers/axiosInstance";

export const searchRssSite = (rssFeedUrl) => {
    return axiosInstance().post("/getRssSiteFromWeb", {
        rssFeedUrl: rssFeedUrl
    })
        .then((res) => {
            return Promise.resolve(res.data.rssSite);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}
