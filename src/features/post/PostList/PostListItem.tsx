import { Avatar, Box, Button, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import { BiComment, BiDownvote, BiUpvote } from 'react-icons/bi';
import { GetPostsResponseItem } from '../../../api/post';
import { getTimePassed } from '../../../utils/dayjs';

export default function PostListItem({ post }: { post: GetPostsResponseItem }) {
    return (
        <Box display='flex' gap={2} w='full' background='black' py={2} px={1} boxShadow='lg' borderRadius='md'>
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
                        <Avatar size='xs' name={post.topic.display_title} />
                        <Text fontSize='sm' fontWeight='bold'>
                            a/{post.topic.display_title}
                        </Text>
                    </HStack>
                    <Text fontSize='xs'>&#8729;</Text>
                    <Text color='gray' fontSize='xs'>
                        Posted by u/{post.user.username} {getTimePassed(post.created_at)}
                    </Text>
                    <Box flexGrow={1} />
                    <Button size='xs' borderRadius='full'>
                        Join
                    </Button>
                </HStack>
                <Text fontWeight='semibold'>{post.title}</Text>
                {post.media_url && (
                    <Image src={post.media_url} alt={post.title} loading='lazy' w='full' objectFit='contain' />
                )}
                <HStack>
                    <Button variant='ghost' p={1} size='sm' leftIcon={<BiComment />}>
                        {post._count.comments} Comments
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
}
