import { Center, Spinner, Text } from '@chakra-ui/react';
import { isFinite } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffectOnce } from 'usehooks-ts';
import { useLazyGetPostsQuery } from '../api/post';
import PostListItem from '../features/post/PostList/PostListItem';
import TopicSidePanel from '../features/topic/TopicSidePanel';
import useAuth from '../hooks/useAuth';
import GridContainer from '../layout/GridContainer';
import MainContainer from '../layout/MainContainer';

export default function Post() {
    const { topic, post_id } = useParams<{ topic: string; post_id: string }>();
    const navigate = useNavigate();
    const [trigger, { data, isLoading, isFetching, isError }] = useLazyGetPostsQuery();
    const auth = useAuth();

    useEffectOnce(() => {
        if (!topic || !post_id) {
            navigate('/');
        } else {
            const parsedPostId = parseInt(post_id, 10);
            if (!isFinite(parsedPostId)) {
                navigate('/');
            } else {
                trigger({ post_id: parsedPostId }, true);
            }
        }
    });

    if (!data || isLoading || isFetching) {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }

    if (data.count === 0) {
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
        <MainContainer>
            <GridContainer
                mainContent={
                    <PostListItem
                        post={data.data[0]}
                        showCommentForm={!!auth}
                        showComments
                        showTopic
                        hideJoin
                        showFull
                    />
                }
                sideContent={<TopicSidePanel topic={data.data[0].topic} showHeader buttonType='join' />}
                sx={{
                    pt: 8
                }}
            />
        </MainContainer>
    );
}
