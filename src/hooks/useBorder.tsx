import { useColorModeValue } from '@chakra-ui/react';
import { useMemo } from 'react';

function useBorder() {
    const borderColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300');
    const hoverColor = useColorModeValue('blackAlpha.500', 'whiteAlpha.500');
    return useMemo(() => [borderColor, hoverColor], [borderColor, hoverColor]);
}

export default useBorder;
