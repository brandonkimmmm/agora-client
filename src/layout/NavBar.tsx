import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Center,
    Flex,
    Icon,
    IconButton,
    Stack,
    Text,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react';
import { FaThList } from 'react-icons/fa';

export default function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} position='fixed' top={0} width='100%'>
            <Flex h={16} alignItems='center' justifyContent='space-between'>
                <Flex alignItems='center' gap={2}>
                    <Center>
                        <Icon w={6} h={6} as={FaThList} />
                    </Center>
                    <Center>
                        <Text fontSize='2xl' fontWeight='bold'>
                            Collablist
                        </Text>
                    </Center>
                </Flex>
                <Flex alignItems='center'>
                    <Stack direction='row' spacing={4}>
                        <IconButton
                            aria-label='change theme'
                            onClick={toggleColorMode}
                            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        />
                        <Button type='button'>Login</Button>
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    );
}
