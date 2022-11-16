import { IconButton, ResponsiveValue, Stack, SystemProps, SystemStyleObject, Text } from '@chakra-ui/react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { ModalTypes, showModal } from '../features/modal/modalSlice';
import { useAppDispatch } from '../hooks/redux';
import useAuth from '../hooks/useAuth';

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
    iconSize?: ResponsiveValue<(string & object) | 'sm' | 'md' | 'lg' | 'xs'>;
    fontSize?: SystemProps['fontSize'];
}) {
    const auth = useAuth();
    const dispatch = useAppDispatch();
    const getColor = () => {
        if (userValue === 1) {
            return 'brand.500';
        }
        if (userValue === -1) {
            return 'orange.500';
        }
        return textColor;
    };

    const handleUpClick = () => {
        if (onUpvoteClick) {
            if (auth) {
                onUpvoteClick();
            } else {
                dispatch(showModal({ type: ModalTypes.AUTH_LOGIN }));
            }
        }
    };

    const handleDownClick = () => {
        if (onDownvoteClick) {
            if (auth) {
                onDownvoteClick();
            } else {
                dispatch(showModal({ type: ModalTypes.AUTH_LOGIN }));
            }
        }
    };

    return (
        <Stack alignItems='center' direction={direction} sx={sx}>
            <IconButton
                color={userValue === 1 ? 'brand.500' : iconColor}
                size={iconSize}
                aria-label='upvote'
                variant='link'
                icon={<BiUpvote />}
                onClick={handleUpClick}
            />
            <Text color={getColor()} fontSize={fontSize} fontWeight='bold'>
                {value}
            </Text>
            <IconButton
                color={userValue === -1 ? 'orange.500' : iconColor}
                size={iconSize}
                aria-label='downvote'
                variant='link'
                icon={<BiDownvote />}
                onClick={handleDownClick}
            />
        </Stack>
    );
}
