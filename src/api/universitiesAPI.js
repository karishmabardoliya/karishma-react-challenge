import axios from "axios";

export const getAllUniversities = async (name) => {
    return axios.get(`http://universities.hipolabs.com/search?country=${name}`).then((response) => response);
}

export const getAllCountries = async () => {
    return axios.get(`https://countriesnow.space/api/v0.1/countries/info?returns=none`).then((response) => response.data);
}