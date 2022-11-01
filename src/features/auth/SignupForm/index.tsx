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
import { useSignupMutation } from '../../../api/auth';
import { getErrorMessage } from '../../../api/helpers';
import { useAppDispatch } from '../../../hooks/redux';
import { ModalTypes, showModal } from '../../modal/modalSlice';
import { SignupSchema, signupSchema } from '../schema';
import SignupPasswordCheck from './SignupPasswordCheck';

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [postSignup] = useSignupMutation();
    const toast = useToast();
    const dispatch = useAppDispatch();
    // const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isValid, touchedFields },
        watch
    } = useForm<SignupSchema>({
        resolver: zodResolver(signupSchema),
        mode: 'onChange'
    });

    const passwordWatch = watch('password');

    const showSubmit = () => {
        return touchedFields.username && passwordWatch && !errors.username && !errors.password;
    };

    const onSubmit = async (data: SignupSchema) => {
        try {
            await postSignup(data).unwrap();
            toast({
                title: 'Signup successful!',
                status: 'success',
                duration: 9000,
                isClosable: true
            });
            dispatch(showModal({ type: ModalTypes.AUTH_LOGIN }));
        } catch (err) {
            toast({
                title: 'Failed to signup',
                description: getErrorMessage(err),
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }
    };

    const handleShowPassword = () => setShowPassword(!showPassword);

    return (
        <VStack as='form' onSubmit={handleSubmit(onSubmit)} spacing={4}>
            {/* {isOpen && (
                <Alert status='warning'>
                    <AlertIcon />
                    <Box>
                        <AlertTitle>Signup is disabled</AlertTitle>
                        <AlertDescription>
                            You may complete the form to demo the signup process. However, signup is disabled at this
                            time.
                        </AlertDescription>
                    </Box>
                    <CloseButton alignSelf='flex-start' position='relative' right={-1} top={-1} onClick={onClose} />
                </Alert>
            )} */}
            <FormControl isInvalid={!!errors.username}>
                <FormLabel fontSize='sm'>Username</FormLabel>
                <Input
                    id='signup-username'
                    isInvalid={!!errors.username}
                    placeholder='Username'
                    variant='filled'
                    {...register('username', {
                        required: true
                    })}
                    autoFocus
                />
                {errors.username && (
                    <FormErrorMessage fontSize='xs'>{errors.username?.message as string}</FormErrorMessage>
                )}
            </FormControl>
            <VStack w='full'>
                <FormControl isInvalid={!!errors.password}>
                    <FormLabel fontSize='sm'>Password</FormLabel>
                    <InputGroup>
                        <Input
                            id='signup-password'
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
                </FormControl>
                <SignupPasswordCheck password={passwordWatch} />
            </VStack>
            {showSubmit() && (
                <>
                    <FormControl isInvalid={!!errors.password_confirmation}>
                        <FormLabel fontSize='sm'>Confirm your password</FormLabel>

                        <InputGroup>
                            <Input
                                id='password_confirmation'
                                isInvalid={!!errors.password_confirmation}
                                placeholder='Confirm Password'
                                type={showPassword ? 'text' : 'password'}
                                {...register('password_confirmation', {
                                    required: true
                                })}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' type='button' onClick={handleShowPassword}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {!!errors.password_confirmation && (
                            <FormErrorMessage>{errors.password_confirmation?.message as string}</FormErrorMessage>
                        )}
                    </FormControl>
                    <Button
                        w='full'
                        type='submit'
                        colorScheme='green'
                        mt={6}
                        isLoading={isSubmitting}
                        isDisabled={!isValid}
                    >
                        Signup
                    </Button>
                </>
            )}
            <Text fontSize='sm' pt={4}>
                Already have an account?{' '}
                <Button
                    onClick={() => dispatch(showModal({ type: ModalTypes.AUTH_LOGIN }))}
                    colorScheme='blue'
                    fontWeight='normal'
                    size='sm'
                    variant='link'
                >
                    Login
                </Button>{' '}
                here!
            </Text>
        </VStack>
    );
}
