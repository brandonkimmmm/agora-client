import { useColorModeValue } from '@chakra-ui/react';
import { useMemo } from 'react';

function useTextColor() {
    const color = useColorModeValue('blackAlpha.500', 'whiteAlpha.500');
    return useMemo(() => color, [color]);
}

export default useTextColor;
