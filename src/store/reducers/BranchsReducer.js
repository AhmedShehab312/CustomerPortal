import {
    STORE_BRANCHES,
} from '../constants/Branchs';

const initialState = {
    Branches: {},
};

const Branchs = (state = initialState, action) => {
    if (action.type === STORE_BRANCHES) {
        return {
            ...state,
            Branches: action.payload.Branches,
        };
    }
    return state;
};

export default Branchs;
