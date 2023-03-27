import axios from "axios";
const baseURL = "https://api.zippopotam.us";

export const getPostalCodeDetail = async(postalCode) => {
    return axios.get(`${baseURL}/us/${postalCode}`).then((response) => response.data);
}