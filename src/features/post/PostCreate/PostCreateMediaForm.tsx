import {
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    Textarea,
    useToast,
    VStack
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ResizeTextarea from 'react-textarea-autosize';
import { getErrorMessage } from '../../../api/helpers';
import { usePostPostMutation } from '../../../api/post';
import { GetTopicsAvailableResponseItem } from '../../../api/topic';
import useButtonColorScheme from '../../../hooks/useButtonColorScheme';
import useTextColor from '../../../hooks/useTextColor';
import { createPostMediaSchema, CreatePostMediaSchema } from './schema';

export default function PostCreateMediaForm({ topic }: { topic: GetTopicsAvailableResponseItem | null }) {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        watch
    } = useForm<CreatePostMediaSchema>({
        resolver: zodResolver(createPostMediaSchema)
    });
    const toast = useToast();
    const title = watch('title');
    const textColor = useTextColor();
    const colorScheme = useButtonColorScheme();
    const [createPost] = usePostPostMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: CreatePostMediaSchema) => {
        try {
            if (topic) {
                const { id } = await createPost({ topic_title: topic.title, ...data }).unwrap();
                toast({
                    title: 'Successfully created post!',
                    status: 'success',
                    duration: 9000,
                    isClosable: true
                });
                navigate(`/a/${topic.display_title}/comments/${id}`);
            }
        } catch (err) {
            toast({
                title: 'Failed to create post',
                description: getErrorMessage(err),
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }
    };

    return (
        <VStack as='form' onSubmit={handleSubmit(onSubmit)}>
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
            <FormControl isInvalid={!!errors.media_url}>
                <Input
                    type='url'
                    variant='outline'
                    placeholder='Video or image url'
                    {...register('media_url', { required: true })}
                />
                {errors.media_url && <FormErrorMessage>{errors.media_url?.message as string}</FormErrorMessage>}
            </FormControl>
            <Button
                disabled={!topic}
                isLoading={isSubmitting}
                type='submit'
                alignSelf='end'
                colorScheme={colorScheme}
                size='sm'
                borderRadius='full'
            >
                Post
            </Button>
        </VStack>
    );
}
