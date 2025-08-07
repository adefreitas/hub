import { useContext } from 'react';
import { FeatureFlagContext } from '../contexts/featureFlagContext';
import { FeatureFlag } from '../types/featureFlags';

const isFeatureEnabled = ({
    featureFlags,
    featureFlag,
}: { featureFlags: FeatureFlag[]; featureFlag: FeatureFlag }): boolean => {
    return featureFlags.includes(featureFlag);
};

export const useFeatureFlags = (featureFlag: FeatureFlag): boolean => {
    const { featureFlags } = useContext(FeatureFlagContext);
    if (!featureFlags) {
        throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
    }

    return isFeatureEnabled({
        featureFlags,
        featureFlag,
    });
};

export default useFeatureFlags;
