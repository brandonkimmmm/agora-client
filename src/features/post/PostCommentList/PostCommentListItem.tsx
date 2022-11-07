import { Avatar, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { GetPostCommentsResponseItem } from '../../../api/post';
import { getTimePassed } from '../../../utils/dayjs';

export default function PostCommentListItem({ comment }: { comment: GetPostCommentsResponseItem }) {
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
                <HStack spacing={0} pt={2}>
                    <IconButton size='md' aria-label='upvote' variant='link' icon={<BiUpvote />} />
                    <Text fontSize='sm' fontWeight='bold'>
                        10
                    </Text>
                    <IconButton size='lg' aria-label='downvote' variant='link' icon={<BiDownvote />} />
                </HStack>
            </VStack>
        </HStack>
    );
}
