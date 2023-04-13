import { v4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    console.log('setAlert');
    const id = v4();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export { setAlert }