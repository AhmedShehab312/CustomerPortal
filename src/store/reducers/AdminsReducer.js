import {
    STORE_ADMINS,
} from '../constants/Admins';

const initialState = {
    Admins: {},
};

const Admins = (state = initialState, action) => {
    if (action.type === STORE_ADMINS) {
        return {
            ...state,
            Admins: action.payload.Admins,
        };
    }
    return state;
};

export default Admins;
