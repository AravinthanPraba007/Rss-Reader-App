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
            console.log(err);
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
            console.log(err);
        })
}