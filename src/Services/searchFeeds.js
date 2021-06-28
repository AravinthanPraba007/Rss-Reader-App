import axiosInstance from "../Helpers/axiosInstance";

export const searchFeeds = (searchText) => {
    return axiosInstance().post("/searchFeed", {
        searchText: searchText
    })
        .then((res) => {
            return Promise.resolve(res.data.feeds);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}
