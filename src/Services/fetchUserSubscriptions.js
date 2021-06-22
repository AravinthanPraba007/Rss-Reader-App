import axiosInstance from "../Helpers/axiosInstance";

export const fetchUserSubscription = (params) => {
    return axiosInstance().get("/getRssSubscriptionList")
        .then((res) => {
            let subcriptionList = [];
            subcriptionList = res.data.subcriptionList;
            return Promise.resolve(subcriptionList);
        })
        .catch((err) => {
            console.log(err);
        })
}
