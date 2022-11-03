import { Box, Container, SystemProps } from '@chakra-ui/react';
import { ReactNode } from 'react';
import NavBar from './NavBar';

export default function MainContainer({
    children,
    maxW = 'container.lg',
    background,
    pb = 10
}: {
    children: ReactNode;
    maxW?: SystemProps['maxW'];
    background?: SystemProps['background'];
    pb?: SystemProps['pb'];
}) {
    return (
        <Box>
            <NavBar />
            <Container background={background} maxW={maxW} pt={12} pb={pb} minH='100vh'>
                {children}
            </Container>
        </Box>
    );
}
