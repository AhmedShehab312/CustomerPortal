import {
    STORE_PROFILE,
} from '../constants/Profile';


function StoreProfile(Profile) {
    return {
        type: STORE_PROFILE,
        payload: { Profile },
    };
}


export { StoreProfile };
