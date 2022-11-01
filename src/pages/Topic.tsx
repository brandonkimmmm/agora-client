import { Box, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import GridContainer from '../layout/GridContainer';
import MainContainer from '../layout/MainContainer';

export default function Topic() {
    const { topic } = useParams();

    return (
        <MainContainer>
            <GridContainer
                mainContent={
                    <Box>
                        <Text>HI</Text>
                    </Box>
                }
                sideContent={
                    <Box>
                        <Text>THERE</Text>
                    </Box>
                }
            />
        </MainContainer>
    );
}
