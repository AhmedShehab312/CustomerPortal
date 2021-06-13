import {
    STORE_GROUPS,
} from '../constants/Groups';


function StoreGroups(Groups) {
    return {
        type: STORE_GROUPS,
        payload: { Groups },
    };
}


export { StoreGroups };
