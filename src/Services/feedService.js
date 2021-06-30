import axiosInstance from "../Helpers/axiosInstance";

export const fetchUserFeeds = (page) => {
    return axiosInstance().post("/getUserFeeds", {
        page: page
    })
        .then((res) => {
            return Promise.resolve(res.data.feeds);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

export const fetchSiteFeeds = (page, rssId) => {
    return axiosInstance().post("/getSiteFeeds", {
        page: page,
        rssId: rssId
    })
        .then((res) => {
            return Promise.resolve(res.data.feeds);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

export const fetchSiteFeedsByRssUrl = (rssFeedUrl) => {
    return axiosInstance().post("/getRssSiteFeedsFromWeb", {
        rssFeedUrl: rssFeedUrl
    })
        .then((res) => {
            return Promise.resolve(res.data.rssSiteFeeds);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

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