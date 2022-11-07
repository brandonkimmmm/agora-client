import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Icon, IconButton, Text } from '@chakra-ui/react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { TiDocumentText } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { GetPostsResponseItem } from '../../../api/post';

export default function PostHeader({ post }: { post: GetPostsResponseItem }) {
    const navigate = useNavigate();

    return (
        <HStack w='full' background='rgb(3,3,3)' px={28} py={2}>
            <HStack borderX='1px' borderColor='gray.500' spacing={0}>
                <IconButton color='white' size='lg' aria-label='upvote' variant='link' icon={<BiUpvote />} />
                <Text fontSize='sm' color='white'>
                    {post._sum.votes}
                </Text>
                <IconButton color='white' size='lg' aria-label='upvote' variant='link' icon={<BiDownvote />} />
            </HStack>
            <HStack>
                <Icon h={5} w={5} color='white' as={TiDocumentText} />
                <Text fontSize='sm' color='white'>
                    {post.title}
                </Text>
            </HStack>
            <Box flexGrow={1} />
            <Button
                size='xs'
                variant='link'
                color='white'
                onClick={() => navigate(-1)}
                leftIcon={<CloseIcon />}
                sx={{
                    _hover: {
                        textDecor: 'none'
                    }
                }}
            >
                Close
            </Button>
        </HStack>
    );
}
