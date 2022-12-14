import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    HStack,
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
import { useNavigate } from 'react-router-dom';
import { resetAuth } from '../features/auth/authSlice';
import { ModalTypes, showModal } from '../features/modal/modalSlice';
import { useAppDispatch } from '../hooks/redux';
import useAuth from '../hooks/useAuth';
import useBackground from '../hooks/useBackground';
import useBorder from '../hooks/useBorder';
import useButtonColorScheme from '../hooks/useButtonColorScheme';

export default function NavBar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const colorScheme = useButtonColorScheme();
    const dispatch = useAppDispatch();
    const auth = useAuth();
    const toast = useToast();
    const background = useBackground();
    const navigate = useNavigate();
    const [borderColor] = useBorder();

    const handleLogout = () => {
        dispatch(resetAuth());
        toast({
            title: 'Logout successful',
            status: 'success',
            duration: 9000,
            isClosable: true
        });
        navigate(0);
    };

    return (
        <Box
            bg={background}
            px={4}
            position='fixed'
            top={0}
            width='100%'
            zIndex='docked'
            borderBottom='1px'
            borderColor={borderColor}
        >
            <Flex h={12} alignItems='center' justifyContent='space-between'>
                <Flex
                    alignItems='center'
                    gap={2}
                    onClick={() => (window.location.pathname === '/' ? navigate(0) : navigate('/'))}
                    sx={{
                        _hover: {
                            cursor: 'pointer'
                        }
                    }}
                >
                    <HStack align='end'>
                        <Icon w={8} h={8} as={MdWifiTethering} color='brand.500' />
                        <Text fontSize='xl' fontWeight='medium'>
                            Agora
                        </Text>
                    </HStack>
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
