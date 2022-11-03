import PostList from '../features/post/PostList';
import TrendingTopicList from '../features/topic/TrendingTopicList';
import GridContainer from '../layout/GridContainer';
import MainContainer from '../layout/MainContainer';

export default function Home() {
    return (
        <MainContainer>
            <GridContainer
                mainContent={<PostList showTopic />}
                sideContent={<TrendingTopicList />}
                sx={{
                    pt: 8
                }}
            />
        </MainContainer>
    );
}
