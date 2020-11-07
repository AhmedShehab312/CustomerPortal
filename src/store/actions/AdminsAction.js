import {
    STORE_ADMINS,
} from '../constants/Admins';


function StoreAdmins(Admins) {
    return {
        type: STORE_ADMINS,
        payload: { Admins },
    };
}


export { StoreAdmins };
