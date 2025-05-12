import { ConnectorConfig, HubData } from './types';

export const getHubData = async (token: string, baseUrl: string) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (!token) {
        throw new Error('Token is required');
    }

    headers['x-hub-session-token'] = token;

    const hubResponse = await fetch(`${baseUrl}/hub/connectors`, {
        method: 'GET',
        headers,
    });

    if (!hubResponse.ok) {
        throw new Error('Network response was not ok');
    }

    const response = (await hubResponse.json()) as HubData;
    console.log('Hub dta response:', response);
    return response;
};

export const getConnectorConfig = async (baseUrl: string, token: string, connectorKey: string) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (!token) {
        throw new Error('Token is required');
    }

    headers['x-hub-session-token'] = token;

    const response = await fetch(`${baseUrl}/hub/connectors/${connectorKey}`, {
        method: 'GET',
        headers,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data as ConnectorConfig;
};

export const connectAccount = async (
    baseUrl: string,
    token: string,
    provider: string,
    credentials: Record<string, unknown>,
) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (!token) {
        throw new Error('Token is required');
    }

    headers['x-hub-session-token'] = token;

    const response = await fetch(`${baseUrl}/hub/accounts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            provider,
            credentials,
        }),
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
        throw new Error(errorResponse.message || 'Unknown error');
    }

    const data = await response.json();
    return data.data as ConnectorConfig;
};
