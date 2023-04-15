import axios from 'axios';
import { setAlert } from './alert';
import { GET_MULTIMEDIA, MULTIMEDIA_ERROR, ADD_MULTIMEDIA, DELETE_MULTIMEDIA, GET_MULTIMEDIAS, EDIT_MULTIMEDIA } from './types';

const myMultimedia = userId => async dispatch => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/multimedia/me`);
        console.log('res.data', res.data);
        dispatch({
            type: GET_MULTIMEDIA,
            payload: res.data
        })
    } catch (err) {
        // const errors = err.response.data.errors;
        // console.log('err', err);
        // if (errors) {
        //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        // }
        dispatch({
            type: MULTIMEDIA_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

const createMultimedia = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    try {
        console.log('formData', formData);
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/multimedia/add`, formData, config);
        console.log('res.data', res.data);
        dispatch({
            type: ADD_MULTIMEDIA,
            payload: res.data
        })

        dispatch(setAlert('Multimedia Created', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        console.log('err', err);
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: MULTIMEDIA_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete Multimedia
const deleteMultimedia = (id) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/multimedia/${id}`);
        console.log('id', id);
        dispatch({
            type: DELETE_MULTIMEDIA,
            payload: id
        })
        dispatch(setAlert('Multimedia Removed', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: MULTIMEDIA_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

const getMultimedias = id => async dispatch => {
    try {
        if (id) {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/multimedia/user/${id}`);
            console.log('res.data', res.data);
            dispatch({
                type: GET_MULTIMEDIAS,
                payload: res.data
            })
        } else {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/multimedia`);
            console.log('res.data', res.data);
            dispatch({
                type: GET_MULTIMEDIAS,
                payload: res.data
            })
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: MULTIMEDIA_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

const editMultimedia = (formData) => async dispatch => {
    const { id } = formData;
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    try {
        // console.log('formData', formData);
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/multimedia/${id}`, formData, config);
        // console.log('res.data', res.data);
        res.data.id = id;
        dispatch({
            type: EDIT_MULTIMEDIA,
            payload: res.data
        })
        dispatch(setAlert('Multimedia Updated', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        // console.log('err', err);
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: MULTIMEDIA_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}



export { myMultimedia, createMultimedia, deleteMultimedia, getMultimedias, editMultimedia };