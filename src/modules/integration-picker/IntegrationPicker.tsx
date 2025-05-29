import { useCallback, useMemo, useState } from 'react';
import { IntegrationForm } from './components/IntegrationFields';
import { IntegrationSelector } from './components/IntegrationSelector';
import { connectAccount, getConnectorConfig, getHubData } from './queries';
import { Integration } from './types';
import { useQuery } from '@tanstack/react-query';
import {
    Button,
    Card,
    Flex,
    FlexAlign,
    FlexDirection,
    FlexGapSize,
    FlexJustify,
    FooterLinks,
    Padded,
    Spacer,
    Typography,
} from '@stackone/malachite';

interface IntegrationPickerProps {
    token: string;
    baseUrl: string;
}

const Title: React.FC<{
    selectedIntegration: Integration;
    onBack: () => void;
    guide?: { supportLink?: string; description: string };
}> = ({ selectedIntegration, onBack, guide }) => {
    return (
        <Flex
            direction={FlexDirection.Horizontal}
            align={FlexAlign.Center}
            gapSize={FlexGapSize.Small}
            justify={FlexJustify.SpaceBetween}
        >
            <Flex
                direction={FlexDirection.Horizontal}
                align={FlexAlign.Center}
                gapSize={FlexGapSize.Small}
                justify={FlexJustify.Left}
            >
                <Button type="ghost" onClick={onBack} icon="←" size="small"></Button>
                <img
                    src={`https://app.stackone.com/assets/logos/${selectedIntegration?.provider}.png`}
                    alt={selectedIntegration?.provider ?? 'N/A'}
                    style={{ width: '24px', height: '24px' }}
                />
                <Typography.Text fontWeight="semi-bold" size="large">
                    {selectedIntegration?.name ?? 'N/A'}
                </Typography.Text>
            </Flex>
            <Typography.Link href={guide?.supportLink} target="_blank">
                <Button type="outline" size="medium">
                    Connection guide
                </Button>
            </Typography.Link>
        </Flex>
    );
};

const Footer: React.FC<{
    selectedIntegration: Integration | null;
    fullWidth?: boolean;
    onBack: () => void;
    onNext: () => void;
}> = ({ fullWidth = true, selectedIntegration, onBack, onNext }) => {
    const buttons: Array<{
        label: string;
        type: 'filled' | 'outline';
        onClick: () => void;
        disabled: boolean;
        loading: boolean;
    }> = useMemo(() => {
        return selectedIntegration
            ? [
                  {
                      label: 'Back',
                      type: 'outline',
                      onClick: () => {
                          onBack();
                      },
                      disabled: false,
                      loading: false,
                  },
                  {
                      label: 'Next',
                      type: 'filled',
                      onClick: onNext,
                      disabled: false,
                      loading: false,
                  },
              ]
            : [];
    }, [selectedIntegration, onBack, onNext]);

    return (
        <Spacer direction="horizontal" size={0} justifyContent="space-between">
            <FooterLinks fullWidth={fullWidth} />
            {buttons.length > 0 && (
                <Padded vertical="medium" horizontal="medium" fullHeight={false}>
                    <Flex direction={FlexDirection.Horizontal} justify={FlexJustify.Right}>
                        <Spacer direction="horizontal" size={10}>
                            {buttons.map((button) => (
                                <Button
                                    key={button.label}
                                    size="small"
                                    type={button.type}
                                    onClick={button.onClick}
                                    disabled={button.disabled}
                                    loading={button.loading}
                                    iconPosition="end"
                                >
                                    {button.label}
                                </Button>
                            ))}
                        </Spacer>
                    </Flex>
                </Padded>
            )}
        </Spacer>
    );
};

export const IntegrationPicker: React.FC<IntegrationPickerProps> = ({ token, baseUrl }) => {
    const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{
        message: string;
        provider_response: string;
    }>();
    const [success, setSuccess] = useState<boolean>(false);
    const [data, setData] = useState<Record<string, string>>({});

    const {
        data: hubData,
        isLoading: isLoadingHubData,
        error: errorHubData,
    } = useQuery({
        queryKey: ['hubData'],
        queryFn: () => getHubData(token, baseUrl),
    });

    const {
        data: connectorData,
        isLoading: isLoadingConnectorData,
        error: errorConnectorData,
    } = useQuery({
        queryKey: ['connectorData', selectedIntegration?.provider],
        queryFn: () => {
            if (!selectedIntegration) {
                return null;
            }

            return getConnectorConfig(baseUrl, token, selectedIntegration.provider);
        },
    });

    const { fields, guide } = useMemo(() => {
        if (!connectorData || !selectedIntegration) {
            return {
                fields: [],
            };
        }

        const authConfig =
            connectorData.authentication?.[selectedIntegration.authentication_config_key];
        const authConfigForEnvironment = authConfig?.[selectedIntegration.environment];

        return {
            fields: authConfigForEnvironment?.fields || [],
            guide: authConfigForEnvironment?.guide,
        };
    }, [connectorData, selectedIntegration]);

    const handleConnect = useCallback(async () => {
        if (!selectedIntegration) {
            return;
        }

        setError(undefined);
        setLoading(true);
        await connectAccount(baseUrl, token, selectedIntegration.provider, data)
            .then(() => {
                setSuccess(true);
            })
            .catch((error) => {
                const parsedError = JSON.parse(error.message) as {
                    status: number;
                    message: string;
                };

                const doubleParsedError = JSON.parse(parsedError.message) as {
                    message: string;
                    provider_response: string;
                };

                setError({
                    message: doubleParsedError.message,
                    provider_response: doubleParsedError.provider_response,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [baseUrl, token, selectedIntegration, data]);

    if (isLoadingHubData || isLoadingConnectorData) {
        return <div>Loading...</div>;
    }
    if (errorHubData || errorConnectorData) {
        return <div>Error: {errorHubData?.message || errorConnectorData?.message}</div>;
    }

    if (success) {
        return <div>Successfully connected to {selectedIntegration?.provider}</div>;
    }
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Card
            height="400px"
            footer={
                <Footer
                    selectedIntegration={selectedIntegration}
                    onBack={() => setSelectedIntegration(null)}
                    onNext={handleConnect}
                />
            }
            title={
                !selectedIntegration ? null : (
                    <Title
                        selectedIntegration={selectedIntegration}
                        onBack={() => setSelectedIntegration(null)}
                        guide={guide}
                    />
                )
            }
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
                <IntegrationForm fields={fields} error={error} onChange={setData} guide={guide} />
            )}
        </Card>
    );
};
