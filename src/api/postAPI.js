import axios from "axios";
const baseURL = "https://jsonplaceholder.typicode.com";

export const getAllPost = async() => {
    return axios.get(`${baseURL}/posts`).then((response) => response.data);
}

export const addPost = async(data) => {
    return axios.post(`${baseURL}/posts`, data).then((response) => response.data);
}

export const getPostById = async(id) => {
    return axios.get(`${baseURL}/posts/${id}`).then((response) => response.data);
}

export const updatePost = async(data) => {
    return axios.put(`${baseURL}/posts/${data.id}`, data).then((response) => response.data);
}

export const deletePost = async(id) => {
    return axios.delete(`${baseURL}/posts/${id}`).then((response) => response.data);
}