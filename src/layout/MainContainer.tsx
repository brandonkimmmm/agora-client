import { Box, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import RootModal from '../features/modal/RootModal';
import NavBar from './NavBar';

export default function MainContainer({ children }: { children: ReactNode }) {
    return (
        <>
            <RootModal />
            <Box>
                <NavBar />
                <Container maxW='container.lg' pt={20}>
                    {children}
                </Container>
            </Box>
        </>
    );
}
