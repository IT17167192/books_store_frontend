import {API} from "../../config";

export const getPopularBooks = () => {
    return fetch(`${API}/book/popular`, {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const getAllBooks = () => {
    return fetch(`${API}/book/all`, {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
}
