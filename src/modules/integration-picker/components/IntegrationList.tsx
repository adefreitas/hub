import {
    ButtonList,
    Flex,
    FlexAlign,
    FlexDirection,
    FlexGapSize,
    FlexJustify,
    Input,
    Padded,
    Spacer,
    Typography,
} from '@stackone/malachite';
import { useCallback, useState } from 'react';
import { CATEGORIES_WITH_LABELS } from '../../../shared/categories';
import { Integration } from '../types';

interface IntegrationRowProps {
    integration: Integration;
}

const IntegrationRow: React.FC<IntegrationRowProps> = ({ integration }) => {
    return (
        <Flex
            direction={FlexDirection.Horizontal}
            align={FlexAlign.Center}
            gapSize={FlexGapSize.Small}
            justify={FlexJustify.SpaceBetween}
            width="100%"
        >
            <Flex
                direction={FlexDirection.Horizontal}
                align={FlexAlign.Center}
                gapSize={FlexGapSize.Small}
                justify={FlexJustify.Left}
                width="100%"
            >
                <img
                    src={`https://app.stackone.com/assets/logos/${integration.provider}.png`}
                    alt={integration.provider}
                    style={{ width: '24px', height: '24px' }}
                />
                <Typography.Text>{integration.name ?? 'N/A'}</Typography.Text>
            </Flex>
            <Typography.SecondaryText>
                {
                    CATEGORIES_WITH_LABELS.find((category) => category.value === integration.type)
                        ?.label
                }
            </Typography.SecondaryText>
        </Flex>
    );
};

export const IntegrationList: React.FC<{
    integrations: Integration[];
    onSelect: (integration: Integration) => void;
}> = ({ integrations, onSelect }) => {
    const [availableIntegrations, setAvailableIntegrations] = useState<Integration[]>(
        integrations.filter((integration) => integration.active && integration.name),
    );

    const handleSearch = useCallback(
        (value: string) => {
            setAvailableIntegrations(
                integrations.filter(
                    (integration) =>
                        integration.name?.toLowerCase().includes(value.toLowerCase()) &&
                        integration.active &&
                        integration.name,
                ),
            );
        },
        [integrations],
    );

    return (
        <>
            <Input
                name="search"
                placeholder="Search Integrations"
                variant="underline"
                size="large"
                onChange={handleSearch}
            />
            {availableIntegrations.length > 0 ? (
                <Padded vertical="medium" horizontal="small" fullHeight={true}>
                    <Spacer direction="vertical" size={10} align="start">
                        {/* <Flex direction={FlexDirection.Vertical} fullHeight={true}> */}
                        <Padded vertical="small" horizontal="small">
                            <Typography.SecondaryText className="text-left">
                                Add integration
                            </Typography.SecondaryText>
                        </Padded>
                        <ButtonList
                            buttons={availableIntegrations.map((integration) => ({
                                key: integration.provider,
                                children: <IntegrationRow integration={integration} />,
                                onClick: () => onSelect(integration),
                            }))}
                        />
                        {/* </Flex> */}
                    </Spacer>
                </Padded>
            ) : (
                <Flex justify={FlexJustify.Center} align={FlexAlign.Center} fullHeight={true}>
                    <Typography.SecondaryText>No integrations found</Typography.SecondaryText>
                </Flex>
            )}
        </>
    );
};
