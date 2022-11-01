import { Avatar, Box, Button, HStack, Text, useColorMode } from '@chakra-ui/react';
import { GetTopicsResponseItem } from '../../../api/topic';

export default function NewTopicListItem({ topic }: { topic: GetTopicsResponseItem }) {
    const { colorMode } = useColorMode();

    return (
        <HStack w='full'>
            <Avatar size='sm' name={topic.display_title} src={topic.image_url} />
            <Text fontSize='sm' fontWeight='bold'>
                a/{topic.display_title}
            </Text>
            <Box flexGrow={1} />
            <Button colorScheme={colorMode === 'light' ? 'blue' : 'gray'} size='xs' borderRadius='full'>
                Join
            </Button>
        </HStack>
    );
}
