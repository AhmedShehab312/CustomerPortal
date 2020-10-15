import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App/index';
import config from './config';
import { configureStore } from './store/configureStore';
import { Errors } from "./App/components/ComponentModule";


const app = (
    <Provider store={configureStore}>
        <BrowserRouter basename={config.basename}>
            <App />
        </BrowserRouter>
        <Errors />

    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

