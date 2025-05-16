import { Button, Typography } from '@stackone/malachite';
import { Integration } from '../types';

interface IntegrationRowProps {
    integration: Integration;
    onClick?: (integration: Integration) => void;
}

const IntegrationRow: React.FC<IntegrationRowProps> = ({ integration, onClick }) => {
    return (
        <Button
            variant="outline"
            size="xl"
            fullWidth
            flex
            onClick={() => onClick && integration.version === '2' && onClick(integration)}
        >
            <img
                src={`https://app.stackone.com/assets/logos/${integration.provider}.png`}
                alt={integration.provider}
                style={{ width: '40px', height: '40px' }}
            />
            {integration.name ?? 'N/A'} {integration.type.toUpperCase()}
        </Button>
    );
};

export const IntegrationSelector: React.FC<{
    integrations: Integration[];
    onSelect: (integration: Integration) => void;
}> = ({ integrations, onSelect }) => {
    return (
        <>
            <div style={{ marginTop: '20px', marginBottom: '50px' }}>
                <Typography variant="title" className="" align="center">
                    Select Integration
                </Typography>
                <Typography variant="body" className="" align="center">
                    Choose which integration you'd like to set up.
                </Typography>
            </div>
            {integrations
                ?.filter((integration) => integration.active)
                .map((integration) => (
                    <>
                        <IntegrationRow
                            key={integration.provider}
                            integration={integration}
                            onClick={(selectedIntegration) => onSelect(selectedIntegration)}
                        />
                        <br />
                    </>
                ))}
        </>
    );
};
