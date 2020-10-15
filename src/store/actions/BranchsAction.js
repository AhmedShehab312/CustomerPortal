import {
    STORE_BRANCHES,
} from '../constants/Branchs';


function StoreBranches(Branches) {
    return {
        type: STORE_BRANCHES,
        payload: { Branches },
    };
}


export { StoreBranches };
