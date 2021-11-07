// Dependencies
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { CommerceProvider } from "./components/shared/commerce-context";
import "normalize.css";


import "./index.scss";
import App from "./components/App";

ReactDOM.render(
    <CommerceProvider>
        <Router basename={process.env.PUBLIC_URL}>
            <App />
        </Router>
    </CommerceProvider>,
    document.getElementById("root")
);
