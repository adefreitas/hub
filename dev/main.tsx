import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { StackOneHub } from "../src/StackOneHub";
import { HubModes } from "../src/types/types";

const HubWrapper: React.FC = () => {
  const [mode, setMode] = useState<HubModes>();

  return (
    <div>
      <h1>StackOneHub</h1>
      <p>This is a simple React component.</p>
      <p>Current mode: {mode}</p>
      <button onClick={() => setMode("integration-picker")}>
        Set Integration Picker mode
      </button>
      <button onClick={() => setMode("csv-importer")}>
        Set CSV Importer mode
      </button>
      <StackOneHub mode={mode} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HubWrapper />
  </React.StrictMode>
);
