import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { StackOneHub } from "../src/StackOneHub";
import { HubModes } from "../src/types/types";

const HubWrapper: React.FC = () => {
  const [mode, setMode] = useState<HubModes>();
  const [token, setToken] = useState<string>();
  const apiUrl = import.meta.env.VITE_API_URL ?? "https://api.stackone.com";

  const fetchToken = async () => {
    try {
      console.log("API URL:", apiUrl);
      console.log({ environment: import.meta.env });

      const apiKey = import.meta.env.VITE_STACKONE_API_KEY;
      const encodedApiKey = btoa(apiKey ?? "");

      const response = await fetch(`${apiUrl}/connect_sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedApiKey}`,
        },
        body: JSON.stringify({
          metadata: { source: "hub" },
          origin_owner_id:
            import.meta.env.VITE_ORIGIN_OWNER_ID ?? "dummy_customer_id",
          origin_owner_name:
            import.meta.env.VITE_ORIGIN_OWNER_NAME ?? "dummy_customer_name",
          origin_username:
            import.meta.env.VITE_ORIGIN_USERNAME ?? "dummy_username",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setToken(data.token);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

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
      <button onClick={fetchToken}>Fetch Token</button>
      <StackOneHub mode={mode} token={token} baseUrl={apiUrl} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HubWrapper />
  </React.StrictMode>
);
