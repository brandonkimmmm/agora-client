import { Avatar, Box, Button, HStack, Image, LinkBox, LinkOverlay, Skeleton, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { BiComment } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import {
    GetPostsResponseItem,
    usePutPostDownvoteMutation,
    usePutPostResetVoteMutation,
    usePutPostUpvoteMutation
} from '../../../api/post';
import Vote from '../../../components/Vote';
import useAuth from '../../../hooks/useAuth';
import useBackground from '../../../hooks/useBackground';
import useBorder from '../../../hooks/useBorder';
import useButtonColorScheme from '../../../hooks/useButtonColorScheme';
import useTextColor from '../../../hooks/useTextColor';
import { getTimePassed } from '../../../utils/dayjs';
import PostCommentForm from '../PostCommentForm';
import PostCommentList from '../PostCommentList';

export default function PostListItem({
    post,
    showTopic,
    showFull,
    showCommentForm,
    hideJoin,
    showComments
}: {
    post: GetPostsResponseItem;
    showTopic?: boolean;
    showFull?: boolean;
    showCommentForm?: boolean;
    hideJoin?: boolean;
    showComments?: boolean;
}) {
    const background = useBackground();
    const colorScheme = useButtonColorScheme();
    const navigate = useNavigate();
    const textColor = useTextColor();
    const [isLoading, setIsLoading] = useState(true);
    const [borderColor, hoverColor] = useBorder();
    const auth = useAuth();
    const [putPostUpvote] = usePutPostUpvoteMutation();
    const [putPostDownvote] = usePutPostDownvoteMutation();
    const [putPostResetVote] = usePutPostResetVoteMutation();

    const handleTopicClick = () => {
        navigate(`/a/${post.topic.display_title}`);
    };

    const handlePostClick = () => {
        navigate(`/a/${post.topic.display_title}/comments/${post.id}`);
    };

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

    const getPostBody = () => {
        if (showFull) {
            return (
                <VStack align='start' gap={2}>
                    <Text fontSize='sm'>{post.body}</Text>
                    {post.media_url && (
                        <Skeleton w='full' minH='fit-content' isLoaded={!isLoading}>
                            <Image
                                src={post.media_url}
                                alt={post.title}
                                loading='lazy'
                                w='full'
                                height={isLoading ? '400' : undefined}
                                onLoad={() => setIsLoading(false)}
                                objectFit='contain'
                            />
                        </Skeleton>
                    )}
                </VStack>
            );
        }
        if (post.media_url) {
            return (
                <Skeleton w='full' minH='fit-content' isLoaded={!isLoading}>
                    <Image
                        src={post.media_url}
                        alt={post.title}
                        loading='lazy'
                        w='full'
                        height={isLoading ? '400' : undefined}
                        onLoad={() => setIsLoading(false)}
                        objectFit='contain'
                    />
                </Skeleton>
            );
        }
        if (post.body) {
            return (
                <Text noOfLines={3} fontSize='sm'>
                    {post.body}
                </Text>
            );
        }

        return null;
    };

    return (
        <LinkBox
            w='full'
            display='flex'
            flexDir='column'
            bg={background}
            borderRadius='md'
            boxShadow='md'
            border='1px'
            borderColor={borderColor}
            py={3}
            px={2}
            sx={{
                _hover: !showFull
                    ? {
                          cursor: 'pointer',
                          borderColor: hoverColor
                      }
                    : {}
            }}
        >
            <Box display='flex' gap={2} w='full'>
                {!showFull && <LinkOverlay onClick={() => handlePostClick()} />}
                <Vote
                    value={post._sum.votes}
                    userValue={post.user_vote}
                    direction='column'
                    sx={{
                        gap: 0.5,
                        width: 6
                    }}
                    onUpvoteClick={handleUpvoteClick}
                    onDownvoteClick={handleDownvoteClick}
                />
                <VStack w='full' rowGap={2} alignItems='start'>
                    <HStack w='full'>
                        {showTopic && (
                            <>
                                <HStack sx={{ _hover: { cursor: 'pointer' } }} onClick={() => handleTopicClick()}>
                                    <Avatar size='xs' name={post.topic.display_title} src={post.topic.image_url} />
                                    <Button variant='link'>
                                        <Text fontSize='sm' fontWeight='bold'>
                                            a/{post.topic.display_title}
                                        </Text>
                                    </Button>
                                </HStack>
                                <Text fontSize='xs'>&#8729;</Text>
                            </>
                        )}
                        <Text color={textColor} fontSize='xs'>
                            Posted by u/{post.user.username} {getTimePassed(post.created_at)}
                        </Text>
                        {!hideJoin && (
                            <>
                                <Box flexGrow={1} />
                                <Button colorScheme={colorScheme} size='xs' borderRadius='full'>
                                    Join
                                </Button>
                            </>
                        )}
                    </HStack>
                    <Text fontWeight='semibold'>{post.title}</Text>
                    {getPostBody()}
                    <HStack>
                        <Button
                            colorScheme='gray'
                            color={textColor}
                            variant='ghost'
                            p={1}
                            size='xs'
                            leftIcon={<BiComment />}
                        >
                            {post._count.comments} Comments
                        </Button>
                    </HStack>
                    {showCommentForm && <PostCommentForm postId={post.id} />}
                </VStack>
            </Box>
            {showComments && <PostCommentList postId={post.id} />}
        </LinkBox>
    );
}
