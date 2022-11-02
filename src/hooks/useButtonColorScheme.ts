import { useColorMode } from '@chakra-ui/react';
import { useMemo } from 'react';

function useButtonColorScheme() {
    const { colorMode } = useColorMode();

    return useMemo(() => (colorMode === 'light' ? 'blue' : 'gray'), [colorMode]);
}

export default useButtonColorScheme;
