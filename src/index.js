import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { CommerceProvider } from "./contexts/commerce-context";

import "normalize.css";
import "./index.scss";

ReactDOM.render(
    <CommerceProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <App />
        </BrowserRouter>
    </CommerceProvider>,
    document.getElementById("root")
);
