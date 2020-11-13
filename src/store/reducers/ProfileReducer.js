import {
    STORE_PROFILE,
} from '../constants/Profile';

const initialState = {
    OwnerProfile: {
    },
};

const ProfileReducer = (state = initialState, action) => {
    if (action.type === STORE_PROFILE) {
        debugger
        return {
            ...state,
            OwnerProfile: action.payload.Profile,
        };
    }
    return state;
};

export default ProfileReducer;
