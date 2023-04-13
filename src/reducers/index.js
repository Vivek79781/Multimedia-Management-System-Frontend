import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import multimedia from './multimedia';

export default combineReducers({
    auth,
    alert,
    multimedia
});
