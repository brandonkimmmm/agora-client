import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
};

const styles = {
    global: (props: Record<string, any> | StyleFunctionProps) => ({
        body: {
            bg: mode('rgb(218,225,231)', 'rgb(3,3,3)')(props),
            color: mode('gray.800', 'whiteAlpha.900')(props)
        }
    })
};

const components = {
    Checkbox: {
        baseStyle: {
            control: {
                _focus: {
                    boxShadow: 'none'
                }
            }
        }
    }
};

const colors = {
    black: {
        900: '#1B1B1B'
    },
    brand: '#3CBBB1'
};

const theme = extendTheme({
    config,
    components,
    colors,
    styles
});

export default theme;
