import { startTransition, Suspense, useCallback, useEffect, useState } from 'react';
import { fetchQuery, graphql, RelayEnvironmentProvider, useLazyLoadQuery, useMutation, useRelayEnvironment } from 'react-relay';
import { StackOneHub } from '@stackone/hub';
import { relayEnvironment } from './RelayEnvironment';

const PROVIDER_KEY = 'jira';

const providersQuery = graphql`
    query SuspenseMREProvidersQuery {
        viewer @required(action: THROW) {
            stackOneProviders {
                key
                name
                version
                integrationId
            }
        }
    }
`;

const createSessionMutation = graphql`
    mutation SuspenseMRECreateSessionMutation($input: CreateStackOneConnectSessionInput!) {
        createStackOneConnectSession(input: $input) {
            token
            errors
        }
    }
`;

const confirmAccountMutation = graphql`
    mutation SuspenseMREConfirmAccountMutation($input: ConfirmStackOneAccountInput!) {
        confirmStackOneAccount(input: $input) {
            stackOneAccount {
                id
                stackOneAccountId
                provider
                status
            }
            errors
        }
    }
`;

type ConnectState =
    | { status: 'idle' }
    | { status: 'creating_session' }
    | { status: 'hub_open'; token: string }
    | { status: 'confirming_account' }
    | { status: 'done'; message: string }
    | { status: 'error'; message: string };

function SuspenseMREContent() {
    const [connectState, setConnectState] = useState<ConnectState>({ status: 'idle' });

    console.log(`[SuspenseMRE] render — status=${connectState.status}`);

    const data = useLazyLoadQuery<any>(providersQuery, {}, { fetchPolicy: 'network-only' });

    const providers = data?.viewer?.stackOneProviders ?? [];
    const jiraProvider = providers.find((p: { key: string }) => p.key === PROVIDER_KEY);

    const [commitCreateSession] = useMutation<any>(createSessionMutation);
    const [commitConfirmAccount] = useMutation<any>(confirmAccountMutation);

    const handleSuccess = useCallback(
        (account: { id: string; provider: string }) => {
            console.log('[SuspenseMRE] onSuccess:', account);
            setConnectState({ status: 'confirming_account' });

            commitConfirmAccount({
                variables: {
                    input: { stackoneAccountId: account.id, provider: account.provider },
                },
                onCompleted: (responseData: any) => {
                    const { errors } = responseData.confirmStackOneAccount ?? {};
                    if (errors?.length) {
                        setConnectState({
                            status: 'error',
                            message: errors[0] ?? 'Failed to link account',
                        });
                        return;
                    }
                    setConnectState({
                        status: 'done',
                        message: `Account linked: ${account.id} (${account.provider})`,
                    });
                },
                onError: (error: Error) => {
                    setConnectState({
                        status: 'error',
                        message: `Confirm failed: ${String(error)}`,
                    });
                },
            });
        },
        [commitConfirmAccount],
    );

    const handleClose = useCallback(() => {
        console.log('[SuspenseMRE] onClose — resetting to idle');
        setConnectState({ status: 'idle' });
    }, []);

    const requestToken = useCallback(() => {
        if (!jiraProvider) {
            setConnectState({ status: 'error', message: `Provider "${PROVIDER_KEY}" not found` });
            return;
        }

        console.log('[SuspenseMRE] requesting session token');
        setConnectState({ status: 'creating_session' });

        commitCreateSession({
            variables: {
                input: {
                    provider: PROVIDER_KEY,
                    providerVersion: jiraProvider.version ?? undefined,
                    integrationId: jiraProvider.integrationId ?? undefined,
                },
            },
            onCompleted: (responseData: any) => {
                const { token, errors } = responseData.createStackOneConnectSession ?? {};
                if (errors?.length) {
                    setConnectState({
                        status: 'error',
                        message: errors[0] ?? 'Failed to create session',
                    });
                    return;
                }
                if (!token) {
                    setConnectState({ status: 'error', message: 'No token returned' });
                    return;
                }
                console.log('[SuspenseMRE] session token created');
                setConnectState({ status: 'hub_open', token });
            },
            onError: (error: Error) => {
                setConnectState({
                    status: 'error',
                    message: `CreateSession failed: ${String(error)}`,
                });
            },
        });
    }, [jiraProvider, commitCreateSession]);

    // Auto-start on mount — matches client's pattern
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        startTransition(() => {
            requestToken();
        });
    }, []);

    const apiUrl = import.meta.env.VITE_API_URL ?? 'https://api.stackone.com';
    const appUrl = import.meta.env.VITE_APP_URL ?? 'https://app.stackone.com';

    return (
        <div style={{ padding: 24, fontFamily: 'monospace', maxWidth: 800 }}>
            <h2>Suspense MRE — OAuth Debug</h2>
            <p style={{ fontSize: 12, color: '#666', fontFamily: 'sans-serif' }}>
                Replicates client structure: Suspense + useLazyLoadQuery (network-only) +
                startTransition session creation. Check console for state transitions.
            </p>

            <div style={{ marginBottom: 16, padding: 12, background: '#f5f5f5', borderRadius: 4 }}>
                <div>
                    <strong>Provider:</strong> {PROVIDER_KEY}
                </div>
                <div>
                    <strong>Version:</strong> {jiraProvider?.version ?? 'N/A'}
                </div>
                <div>
                    <strong>State:</strong> {connectState.status}
                </div>
                {'message' in connectState && (
                    <div>
                        <strong>Message:</strong> {connectState.message}
                    </div>
                )}
            </div>

            {(connectState.status === 'creating_session' ||
                connectState.status === 'confirming_account') && (
                <div>Loading ({connectState.status})...</div>
            )}

            {connectState.status === 'error' && (
                <div>
                    <div style={{ color: 'red', marginBottom: 8 }}>{connectState.message}</div>
                    <button onClick={requestToken}>retry</button>
                </div>
            )}

            {connectState.status === 'done' && (
                <div style={{ color: 'green' }}>{connectState.message}</div>
            )}

            {connectState.status === 'hub_open' && (
                <StackOneHub
                    key={connectState.token}
                    token={connectState.token}
                    onSuccess={handleSuccess}
                    onClose={handleClose}
                    baseUrl={apiUrl}
                    appUrl={appUrl}
                />
            )}
        </div>
    );
}

function BackgroundPoller() {
    const environment = useRelayEnvironment();
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('[BackgroundPoller] polling store');
            fetchQuery(environment, providersQuery, {}).subscribe({
                next: () => console.log('[BackgroundPoller] store updated'),
                error: console.error,
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [environment]);
    return null;
}

export function SuspenseMRE() {
    return (
        <RelayEnvironmentProvider environment={relayEnvironment}>
            <BackgroundPoller />
            <Suspense
                fallback={
                    <div style={{ padding: 24, fontFamily: 'monospace' }}>
                        Loading providers...
                    </div>
                }
            >
                <SuspenseMREContent />
            </Suspense>
        </RelayEnvironmentProvider>
    );
}
