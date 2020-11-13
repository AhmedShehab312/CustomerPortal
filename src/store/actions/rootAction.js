import { CLEAR_REDUCERS } from '../constants/ClearState';

function clearReducers() {
    return {
        type: CLEAR_REDUCERS,
        payload: null,
    };
}

export { clearReducers };
