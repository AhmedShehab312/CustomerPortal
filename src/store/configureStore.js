import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import ProfileReducer from './reducers/ProfileReducer';
import BranchesReducer from './reducers/BranchsReducer';
import GlobalReducer from './reducers/GlobalReducer';
import AdminsReducer from './reducers/AdminsReducer';

const storageReducer = combineReducers({
    ProfileState: ProfileReducer,
    BranchesState: BranchesReducer,
    GlobalState: GlobalReducer,
    AdminsState: AdminsReducer
});


const configureStore = createStore(storageReducer, applyMiddleware(thunk));

export { configureStore };
