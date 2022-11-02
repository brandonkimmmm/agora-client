import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    Text,
    useColorMode,
    useToast
} from '@chakra-ui/react';
import { MdWifiTethering } from 'react-icons/md';
import { resetAuth } from '../features/auth/authSlice';
import { ModalTypes, showModal } from '../features/modal/modalSlice';
import { useAppDispatch } from '../hooks/redux';
import useAuth from '../hooks/useAuth';
import useBackground from '../hooks/useBackground';
import useButtonColorScheme from '../hooks/useButtonColorScheme';

export default function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const colorScheme = useButtonColorScheme();
    const dispatch = useAppDispatch();
    const auth = useAuth();
    const toast = useToast();
    const background = useBackground();

    const handleLogout = () => {
        dispatch(resetAuth());
        toast({
            title: 'Logout successful',
            status: 'success',
            duration: 9000,
            isClosable: true
        });
    };

    return (
        <Box bg={background} px={4} position='fixed' top={0} width='100%' zIndex='docked'>
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
                        {auth ? (
                            <Menu>
                                <MenuButton as={Button} rounded='full' variant='link' cursor='pointer' minW={0}>
                                    <Avatar colorScheme='brand' size='sm' />
                                </MenuButton>
                                <MenuList alignItems='center' background={background}>
                                    <br />
                                    <Center>
                                        <Avatar colorScheme='brand' size='xl' />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>{auth.username}</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem>Account Settings</MenuItem>
                                    <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <>
                                <Button
                                    size='sm'
                                    type='button'
                                    variant='solid'
                                    borderRadius='full'
                                    colorScheme={colorScheme}
                                    onClick={() => dispatch(showModal({ type: ModalTypes.AUTH_SIGNUP }))}
                                >
                                    Signup
                                </Button>
                                <Button
                                    size='sm'
                                    type='button'
                                    variant='outline'
                                    borderRadius='full'
                                    colorScheme={colorScheme}
                                    onClick={() => dispatch(showModal({ type: ModalTypes.AUTH_LOGIN }))}
                                >
                                    Login
                                </Button>
                            </>
                        )}
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    );
}
