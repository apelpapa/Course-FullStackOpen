import axios from "axios";

const baseURL = '/api/persons'

const get = () =>{
    const request = axios.get(baseURL)
        return request.then(response => response.data)
}

const deletePerson = (deletionID) =>{
    return axios.delete(`${baseURL}/${deletionID}`)
}

const post = (newObject) =>{
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const putPerson = (objectID, updatedObject) =>{
    const request = axios.put(`${baseURL}/${objectID}`, updatedObject)
    return request.then(response => response.data)
}

export default {
    get,
    post,
    deletePerson,
    putPerson
}