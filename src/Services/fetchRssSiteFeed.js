import axiosInstance from "../Helpers/axiosInstance";

export const fetchRssSiteFeeds = (rssFeedUrl) => {
    return axiosInstance().post("/getRssSiteFeedsFromWeb", {
        rssFeedUrl: rssFeedUrl
    })
        .then((res) => {
            return Promise.resolve(res.data.rssSiteFeeds);
        })
        .catch((err) => {
            console.log(err);
        })
}
