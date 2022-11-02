import { Avatar, Box, Button, Container, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { GetTopicsResponseItem } from '../../../api/topic';
import useBackground from '../../../hooks/useBackground';
import useButtonColorScheme from '../../../hooks/useButtonColorScheme';

export default function TopicHeader({ topic }: { topic: GetTopicsResponseItem }) {
    const background = useBackground();
    const colorScheme = useButtonColorScheme();
    const borderColor = useColorModeValue('blue.400', 'white');

    return (
        <Box background={background} width='100vw' position='relative' left='calc(-50vw + 50%)'>
            <Box background='blue.400' height='190' width='full' position='relative'>
                <Box position='absolute' bottom={0} background={background} w='full' h='100'>
                    <Container maxW='container.lg'>
                        <HStack position='absolute' top={-8} align='end' gap={3}>
                            <Avatar size='xl' name={topic.display_title} src={topic.image_url} />
                            <VStack align='start' spacing={-1}>
                                <HStack gap={5}>
                                    <Text fontWeight='bold' fontSize='3xl'>
                                        {topic.display_title}
                                    </Text>
                                    <Button
                                        colorScheme={colorScheme}
                                        borderRadius='full'
                                        variant='outline'
                                        size='sm'
                                        px={6}
                                    >
                                        Join
                                    </Button>
                                </HStack>
                                <Text fontSize='sm' color='gray.500'>
                                    a/{topic.display_title}
                                </Text>
                            </VStack>
                        </HStack>
                        <Button
                            variant='unstyled'
                            position='absolute'
                            borderBottom='4px'
                            borderColor={borderColor}
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
