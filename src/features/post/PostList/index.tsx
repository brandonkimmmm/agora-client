import { Center, List, ListItem, Spinner, Text } from '@chakra-ui/react';
import { useEffectOnce } from 'usehooks-ts';
import { useLazyGetPostsQuery } from '../../../api/post';
import PostListItem from './PostListItem';

export default function PostList({
    title,
    showTopic,
    showFull,
    showCommentForm
}: {
    title?: string;
    showTopic?: boolean;
    showFull?: boolean;
    showCommentForm?: boolean;
}) {
    const [trigger, { data, isLoading, isFetching, isError }] = useLazyGetPostsQuery();

    useEffectOnce(() => {
        trigger({ topic_title: title });
    });

    if (!data || isLoading || isFetching) {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }

    if (data.data.length === 0) {
        return (
            <Center>
                <Text>No data found!</Text>
            </Center>
        );
    }

    if (isError) {
        return (
            <Center>
                <Text>Error</Text>
            </Center>
        );
    }

    return (
        <List w='full' spacing={4}>
            {data.data.map((d) => (
                <ListItem key={d.id}>
                    <PostListItem
                        post={d}
                        showTopic={showTopic}
                        showCommentForm={showCommentForm}
                        showFull={showFull}
                    />
                </ListItem>
            ))}
        </List>
    );
}
