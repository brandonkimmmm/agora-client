import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
};

const theme = extendTheme({
    config,
    components: {
        Checkbox: {
            baseStyle: {
                control: {
                    _focus: {
                        boxShadow: 'none'
                    }
                }
            }
        }
    }
});

export default theme;
