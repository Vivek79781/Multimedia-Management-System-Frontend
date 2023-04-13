import axios from 'axios';
import setAuthInHeader from '../utils/setAuthInHeader';
import { USER_LOADED, AUTH_ERROR, LOGOUT, LOGIN_SUCCESS, REGISTER_SUCCESS } from './types';
import { setAlert } from './alert';
// Load User
const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthInHeader(localStorage.token);
    }
    
    try {
        console.log(process.env.REACT_APP_API_URL);
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
}

// Login User
const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    // const body = JSON.stringify({ email, password });
    const body = { email, password };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        


        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Register User
const register = ({ name, email, password }) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = { name, email, password };

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/users`, body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: AUTH_ERROR,
        });
    }
};


// Logout
const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
}

export { loadUser, logout, login, register };