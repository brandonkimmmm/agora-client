import { Avatar, HStack, IconButton, Input, Tooltip } from '@chakra-ui/react';
import { FiImage, FiLink } from 'react-icons/fi';
import useBackground from '../../../hooks/useBackground';
import useBorder from '../../../hooks/useBorder';
import useTextColor from '../../../hooks/useTextColor';

export default function PostListCreate({ topic }: { topic?: string }) {
    const background = useBackground();
    const [borderColor] = useBorder();
    const textColor = useTextColor();

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
            <Tooltip label='Create media post' hasArrow openDelay={300} background='black' textColor='white'>
                <IconButton
                    colorScheme='gray'
                    textColor={textColor}
                    variant='ghost'
                    aria-label='image-post-update'
                    icon={<FiImage size={20} />}
                />
            </Tooltip>
            <Tooltip label='Create link post' hasArrow openDelay={300} background='black' textColor='white'>
                <IconButton
                    textColor={textColor}
                    colorScheme='gray'
                    variant='ghost'
                    aria-label='link-post-update'
                    icon={<FiLink size={20} />}
                />
            </Tooltip>
        </HStack>
    );
}
