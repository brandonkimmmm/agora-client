import { Avatar, Box, Button, Container, HStack, Text, VStack } from '@chakra-ui/react';
import { GetTopicsResponseItem } from '../../../api/topic';
import useBackground from '../../../hooks/useBackground';

export default function TopicHeader({ topic }: { topic: GetTopicsResponseItem }) {
    const background = useBackground();

    return (
        <Box background={background} width='100vw' position='relative' left='calc(-50vw + 50%)'>
            <Box background='blue.400' height='200' width='full' position='relative'>
                <Box position='absolute' bottom={0} background={background} w='full' h='100'>
                    <Container maxW='container.lg'>
                        <HStack position='absolute' top={-8} align='end' gap={3}>
                            <Avatar
                                size='xl'
                                name={topic.display_title}
                                src={topic.image_url}
                                backgroundColor='white'
                            />
                            <VStack align='start' spacing={-1}>
                                <HStack gap={5}>
                                    <Text fontWeight='bold' fontSize='3xl'>
                                        {topic.display_title}
                                    </Text>
                                    <Button borderRadius='full' variant='outline' size='sm' px={6}>
                                        Join
                                    </Button>
                                </HStack>
                                <Text fontSize='sm' fontWeight='semibold' color='gray.500'>
                                    a/{topic.display_title}
                                </Text>
                            </VStack>
                        </HStack>
                        <Button
                            variant='unstyled'
                            position='absolute'
                            borderBottom='4px'
                            borderRadius={0}
                            bottom={0}
                            height={6}
                        >
                            <Text fontSize='sm' px={2} fontWeight='semibold'>
                                Posts
                            </Text>
                        </Button>
                    </Container>
                </Box>
            </Box>
        </Box>
    );
}
