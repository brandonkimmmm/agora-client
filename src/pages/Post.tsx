import { Center, Container, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import { isFinite } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffectOnce } from 'usehooks-ts';
import { useLazyGetPostsQuery } from '../api/post';
import PostHeader from '../features/post/PostHeader';
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
    const gridBackground = useColorModeValue('gray.700', 'rgb(3,3,3)');

    useEffectOnce(() => {
        if (!topic || !post_id) {
            navigate('/');
        } else {
            const parsedPostId = parseInt(post_id, 10);
            if (!isFinite(parsedPostId)) {
                navigate('/');
            } else {
                trigger({ topic_title: topic, post_id: parsedPostId }, true);
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
        <MainContainer maxW='full' background='gray.900' pb={0}>
            <Container p={0} maxWidth='container.xl'>
                <PostHeader post={data.data[0]} />
                <GridContainer
                    mainContent={
                        <PostListItem post={data.data[0]} showCommentForm={!!auth} showComments showTopic hideJoin />
                    }
                    sideContent={<TopicSidePanel topic={data.data[0].topic} showHeader buttonType='join' />}
                    gap={4}
                    sx={{
                        px: 28,
                        py: 8,
                        background: gridBackground
                    }}
                />
            </Container>
        </MainContainer>
    );
}
