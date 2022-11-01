import { useColorModeValue } from '@chakra-ui/react';
import { useMemo } from 'react';

function useBackground() {
    const color = useColorModeValue('gray.50', 'black.900');
    return useMemo(() => color, [color]);
}

export default useBackground;
