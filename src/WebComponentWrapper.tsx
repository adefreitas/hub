import React from "react";
import ReactDOM from "react-dom/client";
import reactToWebComponent from "react-to-webcomponent";
import StackOneHub from "./StackOneHub";

const WebComponent = reactToWebComponent(StackOneHub, React, ReactDOM);

customElements.define("my-component", WebComponent);
