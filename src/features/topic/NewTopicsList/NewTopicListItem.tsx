import { Avatar, Box, Button, HStack, Text } from '@chakra-ui/react';
import { GetTopicsResponseItem } from '../../../api/topic';

export default function NewTopicListItem({ topic }: { topic: GetTopicsResponseItem }) {
    return (
        <HStack w='full'>
            <Avatar size='sm' name={topic.display_title} />
            <Text fontSize='sm' fontWeight='bold'>
                a/{topic.display_title}
            </Text>
            <Box flexGrow={1} />
            <Button size='xs' borderRadius='full'>
                Join
            </Button>
        </HStack>
    );
}
