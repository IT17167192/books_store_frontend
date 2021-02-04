import {API} from "../config";

export const signUp = (data) => {
    return fetch(`${API}/user/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const login = (data) => {
    return fetch(`${API}/user/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('userDetails', JSON.stringify(data));
        next();
    }
};

export const logout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('userDetails');
        next();

        return fetch(`${API}/logout`, {
            method: 'GET',

        })
            .then(response => console.log('logout', response))
            .catch(err => console.log(err))
    }
};

export const isAuthenticate = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('userDetails')) {
        return JSON.parse(localStorage.getItem('userDetails'));
    } else {
        return false;
    }
};
