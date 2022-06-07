import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {TourProvider} from "@reactour/tour";
import steps from "./steps";

ReactDOM.render(
    <React.StrictMode>
        <TourProvider steps={steps}>
            <App/>
        </TourProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function