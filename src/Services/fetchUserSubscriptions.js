import axiosInstance from "../Helpers/axiosInstance";

export const fetchUserSubscription = (params) => {
    return axiosInstance().get("/getRssSubscriptionList")
    .then((res) => {
        let subcriptionList = [];
        // res.data.subcriptionList.map((subscription, index) => {
        //     subcriptionList.push(subscription);
        // })
        subcriptionList =res.data.subcriptionList;
        return Promise.resolve(subcriptionList);
    })
    .catch((err) => {
        console.log(err);
    })
}
