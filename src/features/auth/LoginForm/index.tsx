import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useToast,
    VStack
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../api/auth';
import { getErrorMessage } from '../../../api/helpers';
import { useAppDispatch } from '../../../hooks/redux';
import { hideModal, ModalTypes, showModal } from '../../modal/modalSlice';
import { setCredentials } from '../authSlice';
import { LoginSchema, loginSchema } from '../schema';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();
    const [postLogin] = useLoginMutation();
    // const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const navigate = useNavigate();
    const toast = useToast();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginSchema) => {
        try {
            const { user, token } = await postLogin(data).unwrap();
            localStorage.setItem('token', token);
            dispatch(setCredentials({ user, token }));
            dispatch(hideModal());
            toast({
                title: `Welcome back, ${user.username}!`,
                status: 'success',
                duration: 9000,
                isClosable: true
            });
            navigate(0);
        } catch (err) {
            toast({
                title: 'Failed to login',
                description: getErrorMessage(err),
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }
    };

    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
        <VStack as='form' onSubmit={handleSubmit(onSubmit)} gap={2}>
            {/* {isOpen && (
                <Alert status='info'>
                    <AlertIcon />
                    <Box>
                        <AlertTitle>Test account for login</AlertTitle>
                        <AlertDescription>
                            Use the following credentials to login and view the application.
                            <br />
                            Email: user@example.com
                            <br />
                            Password: ASDFasdf1234!
                        </AlertDescription>
                    </Box>
                    <CloseButton alignSelf='flex-start' position='relative' right={-1} top={-1} onClick={onClose} />
                </Alert>
            )} */}
            <FormControl isInvalid={!!errors.username}>
                <FormLabel fontSize='sm'>Username</FormLabel>
                <Input
                    id='login-username'
                    isInvalid={!!errors.username}
                    placeholder='Username'
                    autoFocus
                    variant='filled'
                    {...register('username', {
                        required: true
                    })}
                />
                {errors.username ? <FormErrorMessage>{errors.username?.message as string}</FormErrorMessage> : null}
            </FormControl>
            <FormControl isInvalid={!!errors.password} pb={4}>
                <FormLabel fontSize='sm'>Password</FormLabel>
                <InputGroup>
                    <Input
                        id='login-password'
                        isInvalid={!!errors.password}
                        placeholder='Password'
                        variant='filled'
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                            required: true
                        })}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' type='button' onClick={handleShowPassword}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                {errors.password ? <FormErrorMessage>{errors.password?.message as string}</FormErrorMessage> : null}
            </FormControl>
            <Button w='full' type='submit' colorScheme='brand' color='white' isLoading={isSubmitting}>
                Login
            </Button>
            <Text fontSize='sm'>
                Don&apos;t have an account?{' '}
                <Button
                    onClick={() => dispatch(showModal({ type: ModalTypes.AUTH_SIGNUP }))}
                    colorScheme='blue'
                    fontWeight='normal'
                    size='sm'
                    variant='link'
                >
                    Signup
                </Button>{' '}
                here!
            </Text>
        </VStack>
    );
}
