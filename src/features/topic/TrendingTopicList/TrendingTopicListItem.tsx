import { Avatar, Box, HStack, Text } from '@chakra-ui/react';
import { GetTopicsResponseItem } from '../../../api/topic';
import TopicJoinButton from '../../../components/TopicJoinButton';

export default function TrendingTopicListItem({ topic }: { topic: GetTopicsResponseItem }) {
    console.log(window.location.pathname);
    return (
        <HStack w='full'>
            <Avatar size='sm' name={topic.display_title} src={topic.image_url} />
            <Text fontSize='sm' fontWeight='bold'>
                a/{topic.display_title}
            </Text>
            <Box flexGrow={1} />
            <TopicJoinButton title={topic.title} hideJoined />
        </HStack>
    );
}
