import { useState, useEffect } from "react";

interface IntegrationPickerProps {
  token?: string;
  baseUrl?: string;
}

interface Integration {
  name: string;
  provider: string;
  type: string;
}

export const IntegrationPicker: React.FC<IntegrationPickerProps> = ({
  token,
  baseUrl,
}) => {
  const [hubData, setHubData] = useState<Array<Integration>>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };

        if (!token) {
          throw new Error("Token is required");
        }

        headers["x-stackone-api-session-token"] = token;

        const hubResponse = await fetch(`${baseUrl}/hub`, {
          method: "GET",
          headers,
        });

        if (!hubResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await hubResponse.json();
        console.log("Hub Data:", data);
        setHubData(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {hubData?.map((integration) => (
        <div key={integration.provider}>
          <p>{integration.name}</p>
          <p>{integration.type}</p>
          <img
            src={`https://app.stackone.com/assets/logos/${integration.provider}.png`}
            alt={integration.provider}
          />
        </div>
      ))}
      {hubData && hubData.length === 0 && <div>No integrations found.</div>}
    </div>
  );
};
