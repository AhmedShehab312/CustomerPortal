import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import ProfileReducer from './reducers/ProfileReducer';
import BranchesReducer from './reducers/BranchsReducer';
import GlobalReducer from './reducers/GlobalReducer';
import AdminsReducer from './reducers/AdminsReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { CLEAR_REDUCERS } from './constants/ClearState';

const storageReducer = combineReducers({
    ProfileState: ProfileReducer,
    BranchesState: BranchesReducer,
    GlobalState: GlobalReducer,
    AdminsState: AdminsReducer,

});

// Middleware: Redux Persist Config
const rootPersistConfig = {
    key: 'root',
    storage,
    // Whitelist (Save Specific Reducers)
    whitelist: ['storage'],
};

// Middleware: Redux Persist Config
const storagePersistConfig = {
    key: 'storage',
    storage,
    whitelist: ['ProfileState', 'BranchesState', 'GlobalState', 'AdminsState'],
};

const rootStorageReducer = (state, action) => {
    let updatedState = state;
    if (action.type === CLEAR_REDUCERS) {
        updatedState = undefined;
    }
    return storageReducer(updatedState, action);
};


const rootReducer = combineReducers({
    storage: persistReducer(storagePersistConfig, rootStorageReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const configureStore = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(configureStore);

export { configureStore, persistor };



