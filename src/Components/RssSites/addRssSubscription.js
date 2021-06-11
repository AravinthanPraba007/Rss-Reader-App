import axiosInstance from "../../Helpers/axiosInstance";

export const addRssSubscription = (rssFeedUrl) => {
    return axiosInstance().post("/addRssSubscription",{
        rssFeedUrl : rssFeedUrl
    })
    .then((res) => {
        return Promise.resolve(res.data.message);
    })
    .catch((err) => {
        console.log(err);
    })
}
