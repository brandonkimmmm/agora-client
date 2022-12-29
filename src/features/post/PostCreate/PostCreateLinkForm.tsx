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
import { createPostLinkSchema, CreatePostLinkSchema } from './schema';

export default function PostCreateLinkForm({ topic }: { topic: GetTopicsAvailableResponseItem | null }) {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        watch
    } = useForm<CreatePostLinkSchema>({
        resolver: zodResolver(createPostLinkSchema)
    });
    const toast = useToast();
    const title = watch('title');
    const textColor = useTextColor();
    const colorScheme = useButtonColorScheme();
    const navigate = useNavigate();
    const [createPost] = usePostPostMutation();

    const onSubmit = async (data: CreatePostLinkSchema) => {
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
            <FormControl isInvalid={!!errors.link_url}>
                <Input
                    type='url'
                    variant='outline'
                    placeholder='Link url'
                    {...register('link_url', { required: true })}
                />
                {errors.link_url && <FormErrorMessage>{errors.link_url?.message as string}</FormErrorMessage>}
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
