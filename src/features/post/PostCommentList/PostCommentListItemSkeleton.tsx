import { HStack, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react';

export default function PostCommentListItemSkeleton() {
    return (
        <HStack align='start' gap={2}>
            <SkeletonCircle w='6' h='6' />
            <VStack align='start' w='full'>
                <HStack>
                    <SkeletonText noOfLines={1} w='10' />
                    <SkeletonText noOfLines={1} w='10' />
                </HStack>
                <SkeletonText noOfLines={3} w='full' />
            </VStack>
        </HStack>
    );
}
