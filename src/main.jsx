import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./style.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

const pageLoader = document.getElementById("page-loader");
window.setTimeout(() => {
  if (!pageLoader) return;
  pageLoader.classList.add("page-loader-hidden");
  window.setTimeout(() => pageLoader.remove(), 320);
}, 650);
