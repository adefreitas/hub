import { Typography } from '@stackone/malachite';
import { CsvImporter } from './modules/csv-importer.tsx/CsvImporter';
import { IntegrationPicker } from './modules/integration-picker/IntegrationPicker';
import { HubModes } from './types/types';

interface StackOneHubProps {
    mode?: HubModes;
    token?: string;
    baseUrl?: string;
}

export const StackOneHub: React.FC<StackOneHubProps> = ({ mode, token, baseUrl }) => {
    const defaultBaseUrl = 'https://api.stackone.com';
    const apiUrl = baseUrl ?? defaultBaseUrl;

    if (!token) {
        return <div>Error: No token provided</div>;
    }
    if (!mode) {
        return <div>No mode selected</div>;
    }

    return (
        <div>
            {mode === 'integration-picker' && <IntegrationPicker token={token} baseUrl={apiUrl} />}
            {mode === 'csv-importer' && <CsvImporter />}
        </div>
    );
};
