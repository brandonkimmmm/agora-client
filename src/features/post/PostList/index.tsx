import { Center, List, ListItem, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from 'usehooks-ts';
import { useLazyGetPostsQuery } from '../../../api/post';
import PostListItem from './PostListItem';
import PostListItemSkeleton from './PostListItemSkeleton';

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
    const navigate = useNavigate();

    useEffectOnce(() => {
        trigger({ topic_title: title });
    });

    const handlePostClick = (topicTitle: string, postId: number) => {
        navigate(`/a/${topicTitle}/comments/${postId}`);
    };

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
                    <ListItem
                        key={d.id}
                        onClick={() => handlePostClick(d.topic.display_title, d.id)}
                        sx={{
                            _hover: {
                                cursor: 'pointer'
                            }
                        }}
                    >
                        <PostListItem
                            post={d}
                            showTopic={showTopic}
                            showCommentForm={showCommentForm}
                            showFull={showFull}
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
