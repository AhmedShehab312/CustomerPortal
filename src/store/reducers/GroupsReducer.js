import {
    STORE_GROUPS,
} from '../constants/Groups';

const initialState = {
    Groups: {},
};

const Groups = (state = initialState, action) => {
    if (action.type === STORE_GROUPS) {
        return {
            ...state,
            Groups: action.payload.Groups,
        };
    }
    return state;
};

export default Groups;
