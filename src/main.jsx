import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { RouterApp } from "./router/RouterApp.jsx";
import "./scss/general.scss";
import "aos/dist/aos.css";
import ManagerModal from "./components/modal";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <RouterApp />
    </BrowserRouter>
    <ManagerModal />
  </Provider>
);
