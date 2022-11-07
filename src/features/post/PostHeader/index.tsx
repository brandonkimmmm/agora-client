import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Icon, Text } from '@chakra-ui/react';
import { TiDocumentText } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import {
    GetPostsResponseItem,
    usePutPostDownvoteMutation,
    usePutPostResetVoteMutation,
    usePutPostUpvoteMutation
} from '../../../api/post';
import Vote from '../../../components/Vote';
import useAuth from '../../../hooks/useAuth';

export default function PostHeader({ post }: { post: GetPostsResponseItem }) {
    const navigate = useNavigate();
    const auth = useAuth();
    const [putPostUpvote] = usePutPostUpvoteMutation();
    const [putPostDownvote] = usePutPostDownvoteMutation();
    const [putPostResetVote] = usePutPostResetVoteMutation();

    const handleUpvoteClick = () => {
        if (auth) {
            if (post.user_vote === 1) {
                putPostResetVote(post.id);
            } else {
                putPostUpvote(post.id);
            }
        }
    };

    const handleDownvoteClick = () => {
        if (auth) {
            if (post.user_vote === -1) {
                putPostResetVote(post.id);
            } else {
                putPostDownvote(post.id);
            }
        }
    };

    return (
        <HStack w='full' background='rgb(3,3,3)' px={28} py={2}>
            <Vote
                value={post._sum.votes}
                userValue={post.user_vote}
                direction='row'
                sx={{ borderX: '1px', borderColor: 'gray.500' }}
                textColor='white'
                iconColor='white'
                onUpvoteClick={handleUpvoteClick}
                onDownvoteClick={handleDownvoteClick}
            />
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
