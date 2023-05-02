import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./style/index.css";
import VideoCall from "./VideoCall";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <VideoCall />
  </Router>
);
