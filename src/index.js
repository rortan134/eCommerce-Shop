// Dependencies
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { CommerceProvider } from "./components/shared/commerce-context";

// Components
import "normalize.css";
import "./index.scss";
import App from "./components/App";

ReactDOM.render(
    <CommerceProvider>
        <Router>
            <App />
        </Router>
    </CommerceProvider>,
    document.getElementById("root")
);
