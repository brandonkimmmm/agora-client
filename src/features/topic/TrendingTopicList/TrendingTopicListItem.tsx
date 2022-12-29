import { Avatar, Grid, GridItem, Text } from '@chakra-ui/react';
import { GetTopicsResponseItem } from '../../../api/topic';
import TopicJoinButton from '../../../components/TopicJoinButton';

export default function TrendingTopicListItem({ topic }: { topic: GetTopicsResponseItem }) {
    return (
        <Grid templateColumns='repeat(12, 1fr)' w='full' gap={2} alignItems='center'>
            <GridItem colSpan={{ base: 1 }}>
                <Avatar size='sm' name={topic.display_title} src={topic.image_url} />
            </GridItem>
            <GridItem colSpan={{ base: 10 }}>
                <Text fontSize='sm' fontWeight='bold' noOfLines={1}>
                    a/{topic.display_title}
                </Text>
            </GridItem>
            <GridItem colSpan={{ base: 1 }}>
                <TopicJoinButton title={topic.title} hideJoined />
            </GridItem>
        </Grid>
    );
}
