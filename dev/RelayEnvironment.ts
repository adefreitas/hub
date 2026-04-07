import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import type { FetchFunction } from 'relay-runtime';

const PROVIDER_KEY = 'jira';
const PROVIDER_NAME = 'Jira';
const PROVIDER_VERSION = '1.0.0';
const PROVIDER_INTEGRATION_ID = import.meta.env.VITE_INTEGRATION_ID ?? 'b6d98311-d01d-4d4a-af1a-8430a8be02e6';

const fetchFn: FetchFunction = async (operation, _variables) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (operation.name === 'SuspenseMREProvidersQuery') {
        return {
            data: {
                viewer: {
                    __typename: 'Viewer',
                    stackOneProviders: [
                        { key: PROVIDER_KEY, name: PROVIDER_NAME, version: PROVIDER_VERSION, integrationId: PROVIDER_INTEGRATION_ID },
                    ],
                },
            },
        };
    }

    if (operation.name === 'SuspenseMRECreateSessionMutation') {
        const apiUrl = import.meta.env.VITE_API_URL ?? 'https://api.stackone.com';
        const apiKey = import.meta.env.VITE_STACKONE_API_KEY ?? '';
        const encodedApiKey = btoa(apiKey);

        const requestBody = {
            metadata: { source: 'hub' },
            origin_owner_id: import.meta.env.VITE_ORIGIN_OWNER_ID ?? 'dummy_customer_id',
            origin_owner_name: import.meta.env.VITE_ORIGIN_OWNER_NAME ?? 'dummy_customer_name',
            origin_username: import.meta.env.VITE_ORIGIN_USERNAME ?? 'dummy_username',
            ...(_variables.input?.integrationId && {
                integration_id: _variables.input.integrationId,
            }),
        };
        console.log('[RelayEnvironment] createSession body:', requestBody);

        const res = await fetch(`${apiUrl}/connect_sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${encodedApiKey}`,
            },
            body: JSON.stringify(requestBody),
        });

        const json = await res.json();
        return {
            data: {
                createStackOneConnectSession: {
                    token: json.token ?? null,
                    errors: json.token ? null : ['Failed to create session'],
                },
            },
        };
    }

    if (operation.name === 'SuspenseMREConfirmAccountMutation') {
        return {
            data: {
                confirmStackOneAccount: {
                    stackOneAccount: {
                        id: _variables.input?.stackoneAccountId ?? 'mock-id',
                        stackOneAccountId: _variables.input?.stackoneAccountId ?? 'mock-id',
                        provider: _variables.input?.provider ?? 'unknown',
                        status: 'active',
                    },
                    errors: null,
                    viewer: {
                        __typename: 'Viewer',
                        stackOneProviders: [],
                    },
                },
            },
        };
    }

    throw new Error(`[RelayEnvironment] unhandled operation: ${operation.name}`);
};

export const relayEnvironment = new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
});
