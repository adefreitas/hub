import { CsvImporter } from "./modules/CsvImporter";
import { IntegrationPicker } from "./modules/IntegrationPicker";
import { HubModes } from "./types/types";

interface StackOneHubProps {
  mode?: HubModes;
  token?: string;
  baseUrl?: string;
}

export const StackOneHub: React.FC<StackOneHubProps> = ({
  mode,
  token,
  baseUrl,
}) => {
  const modeComponents: Record<HubModes, React.ReactNode> = {
    "integration-picker": <IntegrationPicker token={token} baseUrl={baseUrl} />,
    "csv-importer": <CsvImporter />,
  };

  return (
    <div>
      <h1>StackOneHub</h1>
      <p>Current mode: {mode}</p>
      {mode ? (
        modeComponents[mode] || <div>Invalid mode selected</div>
      ) : (
        <div>No mode selected</div>
      )}
    </div>
  );
};
