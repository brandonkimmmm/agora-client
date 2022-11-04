import { Box, HStack, Skeleton, SkeletonCircle, SkeletonText, Text, VStack } from '@chakra-ui/react';
import useBackground from '../../../hooks/useBackground';

export default function PostListItemSkeleton() {
    const background = useBackground();

    return (
        <Box w='full' display='flex' flexDir='column' bg={background} borderRadius='md' boxShadow='md' py={3} px={2}>
            <Box display='flex' gap={2} w='full'>
                <VStack gap={0.5} w='6' />
                <VStack w='full' rowGap={2} alignItems='start'>
                    <HStack w='full'>
                        <HStack>
                            <SkeletonCircle size='5' />
                            <Skeleton h='2' w='10' noOfLines={1} />
                        </HStack>
                        <Text fontSize='xs'>&#8729;</Text>
                        <SkeletonText w='28' noOfLines={1} />
                    </HStack>
                    <Skeleton height='4' w='full' />
                    <SkeletonText noOfLines={3} w='full' />
                </VStack>
            </Box>
        </Box>
    );
}
