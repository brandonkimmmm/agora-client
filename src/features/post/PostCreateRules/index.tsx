import { HStack, Icon, StackDivider, Text, VStack } from '@chakra-ui/react';
import { MdWifiTethering } from 'react-icons/md';
import useBackground from '../../../hooks/useBackground';

export default function PostCreateRules() {
    const background = useBackground();

    return (
        <VStack background={background} divider={<StackDivider />} borderRadius='md' p={4} align='start' spacing={2}>
            <HStack>
                <Icon w={8} h={8} as={MdWifiTethering} color='brand.500' />
                <Text fontWeight='medium'>Posting to Agora</Text>
            </HStack>
            <Text fontSize='sm' fontWeight='medium'>
                1. Remember the human
            </Text>
            <Text fontSize='sm' fontWeight='medium'>
                2. Behave like you would in real life
            </Text>
            <Text fontSize='sm' fontWeight='medium'>
                3. Look for the original source of content
            </Text>
            <Text fontSize='sm' fontWeight='medium'>
                4. Search for duplicates before posting
            </Text>
            <Text fontSize='sm' fontWeight='medium'>
                5. Read the community&apos;s rules
            </Text>
        </VStack>
    );
}
