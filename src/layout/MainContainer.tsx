import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import NavBar from './NavBar';

export default function MainContainer({ children }: { children: ReactNode }) {
    return (
        <>
            <NavBar />
            <Box pt={24}>{children}</Box>
        </>
    );
}
