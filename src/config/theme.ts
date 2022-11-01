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
    brand: {
        50: '#ecf8f7',
        100: '#c5ebe8',
        200: '#9eddd8',
        300: '#77cfc8',
        400: '#50c2b9',
        500: '#3cbbb1',
        600: '#30968e',
        700: '#24706a',
        800: '#184b47',
        900: '#0c2523'
    }
};

const theme = extendTheme({
    config,
    components,
    colors,
    styles
});

export default theme;
