import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App/index';
import config from './config';
import { configureStore, persistor } from './store/configureStore';
import { Errors } from "./App/components/ComponentModule";
import "react-datepicker/dist/react-datepicker.css";
import { PersistGate } from 'redux-persist/integration/react';


const app = (
    <Provider store={configureStore}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter basename={config.basename}>
                <App />
            </BrowserRouter>
            <Errors />
        </PersistGate>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

