import axiosInstance from "../Helpers/axiosInstance";

export const manageUnsubscribe = (subscriptionId) => {
    return axiosInstance().post("/manageRssSubscription", {
        subscriptionId: subscriptionId,
        action: "unsubscribe"
    })
        .then((res) => {
            return Promise.resolve(res.data.message);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

export const manageSubscribe = (rssId) => {
    return axiosInstance().post("/manageRssSubscription", {
        rssId: rssId,
        action: "subscribe"
    })
        .then((res) => {
            return Promise.resolve(res.data.message);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

export const subscribeByRssUrl = (rssFeedUrl) => {
    return axiosInstance().post("/addRssSubscription", {
        rssFeedUrl: rssFeedUrl
    })
        .then((res) => {
            return Promise.resolve(res.data.message);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

export const fetchUserSubscription = () => {
    return axiosInstance().get("/getRssSubscriptionList")
        .then((res) => {
            let subcriptionList = [];
            subcriptionList = res.data.subcriptionList;
            return Promise.resolve(subcriptionList);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

