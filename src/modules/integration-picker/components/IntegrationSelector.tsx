interface IntegrationRowProps {
  integration: Integration;
  onClick?: (integration: Integration) => void;
}

const IntegrationRow: React.FC<IntegrationRowProps> = ({
  integration,
  onClick,
}) => {
  return (
    <button
      onClick={() =>
        onClick && integration.version === "2" && onClick(integration)
      }
      style={{
        display: "block",
        margin: "10px 0",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
        width: "100%",
        cursor: integration.version === "2" ? "pointer" : "not-allowed",
      }}
      type="button"
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={`https://app.stackone.com/assets/logos/${integration.provider}.png`}
          alt={integration.provider}
          style={{ width: "40px", height: "40px" }}
        />
        <span style={{ color: "#0a0a0a" }}>{integration.name ?? "N/A"}</span>
        <div
          style={{
            backgroundColor: "#f1f1f1",
            borderRadius: "3px",
            padding: "5px",
            color: "#7b7b7b",
            marginLeft: "auto",
          }}
        >
          {integration.type.toUpperCase()}
        </div>
      </div>
    </button>
  );
};

export const IntegrationSelector: React.FC<{
  integrations: Integration[];
  onSelect: (integration: Integration) => void;
}> = ({ integrations, onSelect }) => {
  return (
    <>
      <div style={{ marginTop: "20px", marginBottom: "50px" }}>
        <h1
          style={{ textAlign: "center", margin: "0", fontFamily: "sans-serif" }}
        >
          Select Integration
        </h1>
        <p
          style={{
            textAlign: "center",
            margin: "0",
            fontFamily: "sans-serif",
            color: "#555",
          }}
        >
          Choose which integration you'd like to setup.
        </p>
      </div>
      {integrations
        ?.filter((integration) => integration.active)
        .map((integration) => (
          <IntegrationRow
            key={integration.provider}
            integration={integration}
            onClick={(selectedIntegration) => onSelect(selectedIntegration)}
          />
        ))}
    </>
  );
};
