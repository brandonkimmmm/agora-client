import { Button, ResponsiveValue, SystemStyleObject } from '@chakra-ui/react';
import { useRef } from 'react';
import { useHover } from 'usehooks-ts';
import { usePutTopicSubscribeMutation, usePutTopicUnsubscribeMutation } from '../api/topic';
import useAuth from '../hooks/useAuth';
import useButtonColorScheme from '../hooks/useButtonColorScheme';
import useTopicSubscribed from '../hooks/useTopicSubscribed';

export default function TopicJoinButton({
    title,
    hideJoined,
    sx,
    size = 'xs',
    joinVariant = 'solid',
    leaveVariant = 'outline'
}: {
    title: string;
    hideJoined?: boolean;
    sx?: SystemStyleObject;
    size?: ResponsiveValue<(string & object) | 'xs' | 'sm' | 'md' | 'lg'>;
    joinVariant?: ResponsiveValue<'link' | (string & object) | 'outline' | 'solid' | 'ghost' | 'unstyled'>;
    leaveVariant?: ResponsiveValue<'link' | (string & object) | 'outline' | 'solid' | 'ghost' | 'unstyled'>;
}) {
    const colorScheme = useButtonColorScheme();
    const auth = useAuth();
    const [sub] = usePutTopicSubscribeMutation();
    const [unsub] = usePutTopicUnsubscribeMutation();
    const hoverRef = useRef(null);
    const isHover = useHover(hoverRef);
    const isSubscribed = useTopicSubscribed(title);

    const handleClick = async () => {
        if (!auth) {
            return;
        }
        if (isSubscribed) {
            await unsub(title);
            return;
        }
        await sub(title);
    };

    const getText = () => {
        if (isSubscribed) {
            if (isHover) {
                return 'Leave';
            }
            return 'Joined';
        }
        return 'Join';
    };

    return (
        <Button
            hidden={!!(isSubscribed && hideJoined)}
            colorScheme={colorScheme}
            size={size}
            borderRadius='full'
            onClick={() => handleClick()}
            variant={isSubscribed ? leaveVariant : joinVariant}
            ref={hoverRef}
            sx={sx}
        >
            {getText()}
        </Button>
    );
}
