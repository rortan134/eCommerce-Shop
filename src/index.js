// Dependencies
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CommerceProvider } from "./components/shared/commerce-context";
import "normalize.css";
import "./index.scss";

import App from "./components/App";

ReactDOM.render(
    <CommerceProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <App />
        </BrowserRouter>
    </CommerceProvider>,
    document.getElementById("root")
);
