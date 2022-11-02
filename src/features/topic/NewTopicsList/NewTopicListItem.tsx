import { Avatar, Box, Button, HStack, Text } from '@chakra-ui/react';
import { GetTopicsResponseItem } from '../../../api/topic';
import useButtonColorScheme from '../../../hooks/useButtonColorScheme';

export default function NewTopicListItem({ topic }: { topic: GetTopicsResponseItem }) {
    const colorScheme = useButtonColorScheme();

    return (
        <HStack w='full'>
            <Avatar size='sm' name={topic.display_title} src={topic.image_url} />
            <Text fontSize='sm' fontWeight='bold'>
                a/{topic.display_title}
            </Text>
            <Box flexGrow={1} />
            <Button colorScheme={colorScheme} size='xs' borderRadius='full'>
                Join
            </Button>
        </HStack>
    );
}
