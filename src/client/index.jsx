import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <App name="The React Express" />
    </BrowserRouter>,
    document.getElementById("app")
);

module.hot.accept();