import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import ProfileReducer from './reducers/ProfileReducer';
import BranchesReducer from './reducers/BranchsReducer';
import GlobalReducer from './reducers/GlobalReducer';

const storageReducer = combineReducers({
    ProfileState: ProfileReducer,
    BranchesState: BranchesReducer,
    GlobalState: GlobalReducer
});


const configureStore = createStore(storageReducer, applyMiddleware(thunk));

export { configureStore };
