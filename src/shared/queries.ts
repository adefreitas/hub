import { getRequest } from './httpClient';
import { FeatureFlag } from './types/featureFlags';

export const getSettings = async (baseUrl: string, token: string) => {
    return await getRequest<{ enabled_features: FeatureFlag[] }>({
        url: `${baseUrl}/hub/settings`,
        headers: {
            'Content-Type': 'application/json',
            'x-hub-session-token': token,
        },
    });
};
