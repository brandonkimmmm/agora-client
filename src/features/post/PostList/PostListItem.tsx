import {
    Avatar,
    Box,
    Button,
    HStack,
    IconButton,
    Image,
    Text,
    useColorMode,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import { BiComment, BiDownvote, BiUpvote } from 'react-icons/bi';
import { GetPostsResponseItem } from '../../../api/post';
import { getTimePassed } from '../../../utils/dayjs';

export default function PostListItem({ post }: { post: GetPostsResponseItem }) {
    const { colorMode } = useColorMode();

    return (
        <Box
            display='flex'
            gap={2}
            w='full'
            py={3}
            px={2}
            boxShadow='md'
            borderRadius='md'
            bg={useColorModeValue('gray.50', 'black.900')}
        >
            <VStack gap={0.5} w='5%'>
                <IconButton size='lg' aria-label='upvote' variant='link' icon={<BiUpvote />} />
                <Text fontSize='md' fontWeight='bold'>
                    {post._sum.votes}
                </Text>
                <IconButton size='lg' aria-label='downvote' variant='link' icon={<BiDownvote />} />
            </VStack>
            <VStack w='full' rowGap={2} alignItems='start'>
                <HStack w='full'>
                    <HStack>
                        <Avatar size='xs' name={post.topic.display_title} src={post.topic.image_url} />
                        <Text fontSize='sm' fontWeight='bold'>
                            a/{post.topic.display_title}
                        </Text>
                    </HStack>
                    <Text fontSize='xs'>&#8729;</Text>
                    <Text color={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')} fontSize='xs'>
                        Posted by u/{post.user.username} {getTimePassed(post.created_at)}
                    </Text>
                    <Box flexGrow={1} />
                    <Button colorScheme={colorMode === 'light' ? 'blue' : 'gray'} size='xs' borderRadius='full'>
                        Join
                    </Button>
                </HStack>
                <Text fontWeight='semibold'>{post.title}</Text>
                {post.media_url && (
                    <Image src={post.media_url} alt={post.title} loading='lazy' w='full' objectFit='contain' />
                )}
                <HStack>
                    <Button
                        colorScheme='gray'
                        color={useColorModeValue('blackAlpha.500', 'whiteAlpha.500')}
                        variant='ghost'
                        p={1}
                        size='xs'
                        leftIcon={<BiComment />}
                    >
                        {post._count.comments} Comments
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
}
