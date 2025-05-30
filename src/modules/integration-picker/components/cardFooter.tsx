import { useMemo } from 'react';
import { Integration } from '../types';
import {
    Button,
    Flex,
    FlexDirection,
    FlexJustify,
    FooterLinks,
    Padded,
    Spacer,
} from '@stackone/malachite';

interface CardFooterProps {
    selectedIntegration: Integration | null;
    fullWidth?: boolean;
    onBack: () => void;
    onNext: () => void;
}

const CardFooter: React.FC<CardFooterProps> = ({
    fullWidth = true,
    selectedIntegration,
    onBack,
    onNext,
}) => {
    const buttons = useMemo(() => {
        if (!selectedIntegration) return [];

        return [
            {
                label: 'Back',
                type: 'outline' as const,
                onClick: onBack,
                disabled: false,
                loading: false,
            },
            {
                label: 'Next',
                type: 'filled' as const,
                onClick: onNext,
                disabled: false,
                loading: false,
            },
        ];
    }, [selectedIntegration, onBack, onNext]);

    if (buttons.length === 0) {
        return <FooterLinks fullWidth={fullWidth} />;
    }

    return (
        <Spacer direction="horizontal" size={0} justifyContent="space-between">
            <FooterLinks fullWidth={fullWidth} />
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
        </Spacer>
    );
};

export default CardFooter;
