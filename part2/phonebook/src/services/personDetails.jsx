import axios from "axios";

const baseURL = "api/persons";

const getAll = () => {
    return axios.get(baseURL).then(response => response.data);
}

const get = (id) => {
    return axios.get(`${baseURL}/${id}`).then(response => response.data);
}

const create = (newPerson) => {
    return axios.post(baseURL, newPerson).then(response => response.data);
}

const deleteEntry = (id) => {
    return axios.delete(`${baseURL}/${id}`).then(response => response.data);
}

const update = (id, newData) => {
    return axios.put(`${baseURL}/${id}`, newData).then(response => response.data);
}

export default { getAll, get, create, deleteEntry, update }