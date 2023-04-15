import { GET_MULTIMEDIA, MULTIMEDIA_ERROR, ADD_MULTIMEDIA, DELETE_MULTIMEDIA, GET_MULTIMEDIAS, EDIT_MULTIMEDIA } from '../actions/types';

const initialState = {
    multimedia: [],
    multimediaError: {},
    multimedias: [],
    loading: true,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_MULTIMEDIA:
            return {
                ...state,
                multimedia: payload,
                loading: false,
            };
        case ADD_MULTIMEDIA:
            return {
                ...state,
                multimedia: [...state.multimedia, payload],
                loading: false,
            };
        case DELETE_MULTIMEDIA:
            return {
                ...state,
                multimedia: state.multimedia.filter(multimedia => multimedia.id !== payload),
                loading: false,
            };
        case GET_MULTIMEDIAS:
            return {
                ...state,
                multimedias: payload,
                loading: false,
            };
        case EDIT_MULTIMEDIA:
            return {
                ...state,
                multimedia: state.multimedia.map(multimedia => multimedia.id === payload.id ? payload : multimedia),
                loading: false,
            };
            
        case MULTIMEDIA_ERROR:
            return {
                ...state,
                multimediaError: payload,
                loading: false,
            };
        default:
            return state;
    }
}