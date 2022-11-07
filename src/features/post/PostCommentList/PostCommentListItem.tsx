import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';
import {
    GetPostCommentsResponseItem,
    usePutPostCommentDownvoteMutation,
    usePutPostCommentResetVoteMutation,
    usePutPostCommentUpvoteMutation
} from '../../../api/post';
import Vote from '../../../components/Vote';
import useAuth from '../../../hooks/useAuth';
import { getTimePassed } from '../../../utils/dayjs';

export default function PostCommentListItem({ comment }: { comment: GetPostCommentsResponseItem }) {
    const [putPostCommentUpvote] = usePutPostCommentUpvoteMutation();
    const [putPostCommentDownvote] = usePutPostCommentDownvoteMutation();
    const [putPostCommentReset] = usePutPostCommentResetVoteMutation();
    const auth = useAuth();

    const handleUpvoteClick = () => {
        if (auth) {
            if (comment.user_vote === 1) {
                putPostCommentReset({ post_id: comment.post.id, comment_id: comment.id });
            } else {
                putPostCommentUpvote({ post_id: comment.post.id, comment_id: comment.id });
            }
        }
    };

    const handleDownvoteClick = () => {
        if (auth) {
            if (comment.user_vote === -1) {
                putPostCommentReset({ post_id: comment.post.id, comment_id: comment.id });
            } else {
                putPostCommentDownvote({ post_id: comment.post.id, comment_id: comment.id });
            }
        }
    };

    return (
        <HStack align='start' gap={2}>
            <Avatar size='xs' name={comment.user.username} />
            <VStack align='start'>
                <HStack>
                    <Text fontSize='xs' fontWeight='semibold'>
                        {comment.user.username}
                    </Text>
                    <Text fontSize='xs'>{getTimePassed(comment.created_at)}</Text>
                </HStack>
                <Text fontSize='sm'>{comment.body}</Text>
                <Vote
                    direction='row'
                    value={comment._sum.votes}
                    userValue={comment.user_vote}
                    sx={{
                        pt: 2
                    }}
                    fontSize='sm'
                    iconSize='md'
                    onUpvoteClick={handleUpvoteClick}
                    onDownvoteClick={handleDownvoteClick}
                />
            </VStack>
        </HStack>
    );
}
