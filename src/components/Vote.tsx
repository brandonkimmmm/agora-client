import { IconButton, Stack, SystemStyleObject, Text } from '@chakra-ui/react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';

export default function Vote({
    value,
    userValue,
    direction,
    sx,
    onUpvoteClick,
    onDownvoteClick
}: {
    value: number;
    userValue: number | null;
    direction: 'row' | 'column';
    sx?: SystemStyleObject;
    onUpvoteClick?: () => void;
    onDownvoteClick?: () => void;
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
                color={userValue === 1 ? 'brand.500' : undefined}
                size='lg'
                aria-label='upvote'
                variant='link'
                icon={<BiUpvote />}
                onClick={onUpvoteClick}
            />
            <Text color={getColor()} fontSize='md' fontWeight='bold'>
                {value}
            </Text>
            <IconButton
                color={userValue === -1 ? 'orange.500' : undefined}
                size='lg'
                aria-label='downvote'
                variant='link'
                icon={<BiDownvote />}
                onClick={onDownvoteClick}
            />
        </Stack>
    );
}
