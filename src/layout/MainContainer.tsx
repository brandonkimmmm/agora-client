import { Box, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import NavBar from './NavBar';

export default function MainContainer({ children }: { children: ReactNode }) {
    return (
        <Box>
            <NavBar />
            <Container maxW='container.lg' pt={20} pb={10}>
                {children}
            </Container>
        </Box>
    );
}
