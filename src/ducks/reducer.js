import axios from 'axios';

const initialState = {
    user: {},
    path: ''
}

const GET_USER_INFO = "GET_USER_INFO";
const GET_PATH = "GET_PATH";

export function getUserInfo() {
    let userData = axios.get('/auth/me').then(user => {
        return user.data
    })
    return {
        type: GET_USER_INFO,
        payload: userData
    }
}

export function getPath(path){
    return {
        type: GET_PATH,
        payload: path
    }
}

export default function reducer(state = initialState, action){
    switch (action.type) {
        case GET_USER_INFO + "_FULFILLED":
            return Object.assign({}, state, { user: action.payload })
        case GET_PATH:
            return Object.assign({}, state, { path: action.payload })
        default: return state
    }
}