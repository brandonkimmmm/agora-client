import { IconButton, ResponsiveValue, Stack, SystemProps, SystemStyleObject, Text } from '@chakra-ui/react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';

export default function Vote({
    value,
    userValue,
    direction,
    sx,
    onUpvoteClick,
    onDownvoteClick,
    iconColor,
    textColor,
    iconSize = 'lg',
    fontSize = 'md'
}: {
    value: number;
    userValue: number | null;
    direction: 'row' | 'column';
    sx?: SystemStyleObject;
    onUpvoteClick?: () => void;
    onDownvoteClick?: () => void;
    iconColor?: SystemProps['color'];
    textColor?: SystemProps['color'];
    iconSize?: ResponsiveValue<(string & any) | 'sm' | 'md' | 'lg' | 'xs'>;
    fontSize?: SystemProps['fontSize'];
}) {
    const getColor = () => {
        if (userValue === 1) {
            return 'brand.500';
        }
        if (userValue === -1) {
            return 'orange.500';
        }
        return undefined;
    };

    return (
        <Stack alignItems='center' direction={direction} sx={sx}>
            <IconButton
                color={userValue === 1 ? 'brand.500' : iconColor}
                size={iconSize}
                aria-label='upvote'
                variant='link'
                icon={<BiUpvote />}
                onClick={onUpvoteClick}
            />
            <Text color={textColor || getColor()} fontSize={fontSize} fontWeight='bold'>
                {value}
            </Text>
            <IconButton
                color={userValue === -1 ? 'orange.500' : iconColor}
                size={iconSize}
                aria-label='downvote'
                variant='link'
                icon={<BiDownvote />}
                onClick={onDownvoteClick}
            />
        </Stack>
    );
}
