import {API} from "../../config";

export const addBook = (token, data) => {
    console.log(data);
    return fetch(`${API}/book/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: data
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//update category
export const updateBook = (token, data, bookId) => {
    return fetch(`${API}/book/${bookId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: data
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//delete course by courseId
export const deleteBookById = (token, bookId) => {
    return fetch(`${API}/book/${bookId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const getAllCategories = (token) => {
    return fetch(`${API}/category/all`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//delete course by courseId
export const deleteCategoryById = (token, catId) => {
    return fetch(`${API}/category/${catId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization : `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//add category
export const addCategory = (token, data) => {
    //(JSON.stringify(data));
    return fetch(`${API}/category/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//add Admin user
export const addAdminUser = (token, data) => {
    //(JSON.stringify(data));
    return fetch(`${API}/user/admin/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//update category
export const updateCategory = (token, data, catId) => {
    return fetch(`${API}/category/${catId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
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
