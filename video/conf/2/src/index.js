import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";
import "./style/index.css";
import VideoConference from "./VideoConference";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Router>
    <VideoConference />
  </Router>
);
