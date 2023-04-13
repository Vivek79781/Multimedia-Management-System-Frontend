import axios from "axios";

const setAuthInHeader = (token) => {
    if (token) {
        axios.defaults.headers.common["jwt-token"] = token;
    } else {
        delete axios.defaults.headers.common["jwt-token"];
    }
};

export default setAuthInHeader;