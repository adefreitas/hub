import { useState, useEffect } from "react";
import { getConnectorConfig, getHubData } from "./queries";
import { IntegrationForm } from "./components/IntegrationFields";
import { IntegrationSelector } from "./components/IntegrationSelector";

interface IntegrationPickerProps {
  token: string;
  baseUrl: string;
}

export const IntegrationPicker: React.FC<IntegrationPickerProps> = ({
  token,
  baseUrl,
}) => {
  const [hubData, setHubData] = useState<HubData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [connectorData, setConnectorData] = useState<ConnectorConfig>();
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);

  useEffect(() => {
    const loadHubData = async () => {
      try {
        setIsLoading(true);
        const hubData = await getHubData(token, baseUrl);
        console.log("Hub Data:", hubData);
        setHubData(hubData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    loadHubData();
  }, [token]);

  useEffect(() => {
    if (selectedIntegration) {
      const loadConnectorConfig = async () => {
        try {
          const connectorConfig = await getConnectorConfig(
            baseUrl,
            token,
            selectedIntegration.provider
          );
          setConnectorData(connectorConfig);
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      };
      loadConnectorConfig();
    }
  }, [selectedIntegration]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "32px",
        borderRadius: "10px",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
      }}
    >
      {!connectorData && (
        <IntegrationSelector
          integrations={hubData?.integrations || []}
          onSelect={setSelectedIntegration}
        />
      )}
      {!connectorData && hubData && hubData.integrations.length === 0 && (
        <div>No integrations found.</div>
      )}
      {connectorData && selectedIntegration && (
        <IntegrationForm
          integration={selectedIntegration}
          token={token}
          baseUrl={baseUrl}
          connectorConfig={connectorData}
        />
      )}
    </div>
  );
};
