import { Center, List, ListItem, Text } from '@chakra-ui/react';
import { useEffectOnce } from 'usehooks-ts';
import { useLazyGetPostsQuery } from '../../../api/post';
import PostListItem from './PostListItem';
import PostListItemSkeleton from './PostListItemSkeleton';

export default function PostList({
    title,
    showTopic,
    showFull,
    showCommentForm,
    hideJoin
}: {
    title?: string;
    showTopic?: boolean;
    showFull?: boolean;
    showCommentForm?: boolean;
    hideJoin?: boolean;
}) {
    const [trigger, { data, isLoading, isFetching, isError }] = useLazyGetPostsQuery();

    useEffectOnce(() => {
        trigger({ topic_title: title });
    });

    const getContent = () => {
        if (!data || isLoading || isFetching) {
            return (
                <>
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                </>
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
            <>
                {data.data.map((d) => (
                    <ListItem key={d.id}>
                        <PostListItem
                            post={d}
                            showTopic={showTopic}
                            showCommentForm={showCommentForm}
                            showFull={showFull}
                            hideJoin={hideJoin}
                        />
                    </ListItem>
                ))}
            </>
        );
    };

    return (
        <List w='full' spacing={4}>
            {getContent()}
        </List>
    );
}
