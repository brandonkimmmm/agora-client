import { Box, Button, Text, Textarea } from '@chakra-ui/react';
import useAuth from '../../../hooks/useAuth';
import useButtonColorScheme from '../../../hooks/useButtonColorScheme';
import { IUser } from '../../../types';

export default function PostCommentForm({ postId }: { postId: number }) {
    const auth = useAuth() as IUser;
    const colorScheme = useButtonColorScheme();
    return (
        <Box display='flex' flexDir='column' w='full' pr={10}>
            <Text mb={0.5} fontWeight='thin' fontSize='xs'>
                Comment as {auth.username}
            </Text>
            <Textarea mb={2} fontSize='sm' placeholder='What are your thoughts?' />
            <Button size='xs' colorScheme={colorScheme} alignSelf='flex-end'>
                Comment
            </Button>
        </Box>
    );
}
