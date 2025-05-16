import { Button, Input, Typography } from '@stackone/malachite';
import { useMemo, useState } from 'react';
import { connectAccount } from '../queries';
import { ConnectorConfig, Integration } from '../types';

interface IntegrationFieldsProps {
    integration: Integration;
    connectorConfig: ConnectorConfig;
    token: string;
    baseUrl: string;
}
export const IntegrationForm: React.FC<IntegrationFieldsProps> = ({
    integration,
    connectorConfig,
    token,
    baseUrl,
}) => {
    const { fields, guide } = useMemo(() => {
        const authConfig = connectorConfig.authentication?.[integration.authentication_config_key];
        const authConfigForEnvironment = authConfig?.[integration.environment];
        return {
            fields: authConfigForEnvironment?.fields || [],
            guide: authConfigForEnvironment?.guide,
        };
    }, [connectorConfig, integration]);

    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<{
        message: string;
        provider_response: string;
    }>();
    const [success, setSuccess] = useState<boolean>();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log('submitting form');
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: Record<string, string> = {};
        fields.forEach((field) => {
            const value = formData.get(field.key);
            if (value !== null) {
                data[field.key] = value.toString();
            }
        });
        const handleConnect = async () => {
            setError(undefined);
            setLoading(true);
            await connectAccount(baseUrl, token, integration.provider, data)
                .then((response) => {
                    console.log('Connected successfully:', response);
                    setSuccess(true);
                })
                .catch((error) => {
                    console.error('Error connecting:', {
                        error: JSON.parse(error.message),
                    });
                    setError(JSON.parse(error.message));
                })
                .finally(() => {
                    setLoading(false);
                });
        };
        handleConnect();
    };

    return (
        <div>
            <Typography variant="subtitle">Link {integration.name} Account</Typography>
            {guide && (
                <>
                    {guide.supportLink ? (
                        <a href={guide.supportLink} target="_blank">
                            <Typography variant="link">{guide.description}</Typography>
                        </a>
                    ) : (
                        <Typography>{guide.description}</Typography>
                    )}
                </>
            )}

            {error && (
                <>
                    <Typography style={{ color: 'red' }}>{error.message}</Typography>
                    <pre>{error.provider_response}</pre>
                </>
            )}
            {success && (
                <p style={{ color: 'green' }}>Successfully connected to {integration.provider}</p>
            )}
            {loading && <p>Loading...</p>}
            {!loading && !success && (
                <form onSubmit={onSubmit}>
                    {fields.map((field) => {
                        return (
                            <div key={field.key}>
                                <Typography>
                                    {field.label} ({field.type})
                                </Typography>
                                {field.guide && (
                                    <>
                                        <br />
                                        <Typography type="small">
                                            {field.guide.tooltip}

                                            {field.guide.description}
                                        </Typography>
                                    </>
                                )}
                                {field.type === 'text_area' && (
                                    <textarea
                                        name={field.key}
                                        required={field.required}
                                        placeholder={field.placeholder}
                                        value={field.value}
                                        disabled={field.readOnly}
                                    />
                                )}
                                {field.type === 'select' && (
                                    <select
                                        name={field.key}
                                        required={field.required}
                                        value={field.value}
                                        disabled={field.readOnly}
                                    >
                                        {field.options?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {(field.type === 'text' ||
                                    field.type === 'number' ||
                                    field.type === 'password' ||
                                    field.type == null) && (
                                    <>
                                        <br />
                                        <Input
                                            type={field.type}
                                            name={field.key}
                                            required={field.required}
                                            placeholder={field.placeholder}
                                            value={field.value}
                                            disabled={field.readOnly}
                                        />
                                    </>
                                )}
                            </div>
                        );
                    })}
                    <Button type="submit">Send it</Button>
                </form>
            )}
        </div>
    );
};
