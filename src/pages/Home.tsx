import { Grid, GridItem, Text } from '@chakra-ui/react';
import PostList from '../features/post/PostList';
import MainContainer from '../layout/MainContainer';

export default function Home() {
    return (
        <MainContainer>
            <Grid templateColumns='repeat(12, 1fr)' gap={8}>
                <GridItem colSpan={8}>
                    <PostList />
                </GridItem>
                <GridItem colSpan={4} backgroundColor='blue'>
                    <Text>HI</Text>
                </GridItem>
            </Grid>
        </MainContainer>
    );
}
