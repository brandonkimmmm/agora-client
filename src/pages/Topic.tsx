import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffectOnce } from 'usehooks-ts';
import { useLazyGetTopicsQuery } from '../api/topic';
import PostList from '../features/post/PostList';
import TopicHeader from '../features/topic/TopicHeader';
import GridContainer from '../layout/GridContainer';
import MainContainer from '../layout/MainContainer';

export default function Topic() {
    const { topic } = useParams();
    const navigate = useNavigate();
    const [trigger, { data, isLoading, isFetching, isError }] = useLazyGetTopicsQuery();

    useEffectOnce(() => {
        if (!topic) {
            navigate('/');
        } else {
            trigger({ display_title: topic }, true);
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
            <TopicHeader topic={data.data[0]} />
            <GridContainer
                mainContent={<PostList title={data.data[0].display_title} />}
                sideContent={
                    <Box>
                        <Text>THERE</Text>
                    </Box>
                }
                sx={{
                    pt: 4
                }}
            />
        </MainContainer>
    );
}
