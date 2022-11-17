import { Divider, Text } from '@chakra-ui/react';

export default function PostCreateHeader() {
    return (
        <>
            <Text fontSize='lg' fontWeight='bold' mb={4}>
                Create a post
            </Text>
            <Divider w='full' />
        </>
    );
}
