import { createContext, useMemo } from 'react';
import { FeatureFlag } from '../types/featureFlags';

export const FeatureFlagContext = createContext<{ featureFlags: FeatureFlag[] }>({
    featureFlags: [],
});

export const FeatureFlagProvider = ({
    featureFlags,
    children,
}: {
    featureFlags: FeatureFlag[];
    children: React.ReactNode;
}) => {
    const memoizedContextValue = useMemo(
        () => ({
            featureFlags,
        }),
        [featureFlags],
    );
    return (
        <FeatureFlagContext.Provider value={memoizedContextValue}>
            {children}
        </FeatureFlagContext.Provider>
    );
};
