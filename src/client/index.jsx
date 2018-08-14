import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        {/* <Router> */}
            <App />
        {/* </Router> */}
    </BrowserRouter>,
    document.getElementById("app")
);

module.hot.accept();