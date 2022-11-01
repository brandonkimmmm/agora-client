import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Center,
    Flex,
    Icon,
    IconButton, Stack,
    Text,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react';
import { MdWifiTethering } from 'react-icons/md';

export default function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box
            bg={useColorModeValue('gray.50', 'black.900')}
            px={4}
            position='fixed'
            top={0}
            width='100%'
            zIndex='docked'
        >
            <Flex h={14} alignItems='center' justifyContent='space-between'>
                <Flex alignItems='center' gap={2}>
                    <Center>
                        <Icon w={6} h={6} as={MdWifiTethering} color='brand.500' />
                    </Center>
                    <Center>
                        <Text fontSize='xl' fontWeight='bold'>
                            Agora
                        </Text>
                    </Center>
                </Flex>
                <Flex alignItems='center'>
                    <Stack direction='row' spacing={4}>
                        <IconButton
                            aria-label='change theme'
                            onClick={toggleColorMode}
                            size='sm'
                            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        />
                        <Button
                            size='sm'
                            type='button'
                            variant='solid'
                            borderRadius='full'
                            colorScheme={colorMode === 'light' ? 'blue' : 'gray'}
                        >
                            Signup
                        </Button>
                        <Button
                            size='sm'
                            type='button'
                            variant='outline'
                            borderRadius='full'
                            colorScheme={colorMode === 'light' ? 'blue' : 'gray'}
                        >
                            Login
                        </Button>
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    );
}
