import axiosInstance from "../Helpers/axiosInstance";

export const fetchRssSiteDetails = (rssId) => {
    return axiosInstance().post("/getRssSiteDetails", {
        rssId: rssId
    })
        .then((res) => {
            return Promise.resolve(res.data.rssSite);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}


export const fetchAvailableRssSites = () => {
    return axiosInstance().get("/getAvailableRssSites")
        .then((res) => {
            return Promise.resolve(res.data.rssSiteList);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

export const searchRssSiteByUrl = (rssFeedUrl) => {
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