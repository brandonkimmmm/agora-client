import PostList from '../features/post/PostList';
import NewTopicsList from '../features/topic/NewTopicsList';
import GridContainer from '../layout/GridContainer';
import MainContainer from '../layout/MainContainer';

export default function Home() {
    return (
        <MainContainer>
            <GridContainer
                mainContent={<PostList />}
                sideContent={<NewTopicsList />}
                sx={{
                    pt: 8
                }}
            />
        </MainContainer>
    );
}
