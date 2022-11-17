import { Avatar, HStack, IconButton, Input } from '@chakra-ui/react';
import { FiImage, FiLink } from 'react-icons/fi';
import useBackground from '../../../hooks/useBackground';
import useBorder from '../../../hooks/useBorder';

export default function PostListCreate({ topic }: { topic?: string }) {
    const background = useBackground();
    const [borderColor] = useBorder();

    return (
        <HStack
            background={background}
            w='full'
            borderRadius='md'
            boxShadow='md'
            border='1px'
            borderColor={borderColor}
            py={3}
            px={2}
            spacing={2}
        >
            <Avatar size='sm' />
            <Input placeholder='Create Post' value='' />
            <IconButton variant='ghost' aria-label='image-post-update' icon={<FiImage size={20} />} />
            <IconButton variant='ghost' aria-label='link-post-update' icon={<FiLink size={20} />} />
        </HStack>
    );
}
