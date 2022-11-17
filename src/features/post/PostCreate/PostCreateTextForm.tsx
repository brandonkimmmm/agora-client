import {
    Button,
    FormControl,
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    Text,
    Textarea,
    useToast,
    VStack
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ResizeTextarea from 'react-textarea-autosize';
import useButtonColorScheme from '../../../hooks/useButtonColorScheme';
import useTextColor from '../../../hooks/useTextColor';
import { createPostTextSchema, CreatePostTextSchema } from './schema';

export default function PostCreateTextForm() {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        watch
    } = useForm<CreatePostTextSchema>({
        resolver: zodResolver(createPostTextSchema)
    });
    const toast = useToast();
    const title = watch('title');
    const textColor = useTextColor();
    const colorScheme = useButtonColorScheme();

    return (
        <VStack as='form'>
            <FormControl isInvalid={!!errors.title}>
                <InputGroup>
                    <Textarea
                        minH='unset'
                        overflow='hidden'
                        resize='none'
                        as={ResizeTextarea}
                        variant='outline'
                        placeholder='Title'
                        maxLength={300}
                        {...register('title', { required: true })}
                        pr={75}
                    />
                    <InputRightElement width='4.5rem'>
                        <Text fontWeight='bold' color={textColor} fontSize='xs'>
                            {title ? title.length : 0}/300
                        </Text>
                    </InputRightElement>
                </InputGroup>
                {errors.title && <FormErrorMessage>{errors.title?.message as string}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.body}>
                <Textarea
                    minH='unset'
                    minRows={4}
                    overflow='hidden'
                    resize='none'
                    as={ResizeTextarea}
                    variant='outline'
                    placeholder='Text (optional)'
                    {...register('body')}
                />
                {errors.body && <FormErrorMessage>{errors.body?.message as string}</FormErrorMessage>}
            </FormControl>
            <Button type='submit' alignSelf='end' colorScheme={colorScheme} size='sm' borderRadius='full'>
                Post
            </Button>
        </VStack>
    );
}
