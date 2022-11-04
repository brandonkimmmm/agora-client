import { Avatar, Badge, Box, Button, Center, HStack, Icon, StackDivider, Text, VStack } from '@chakra-ui/react';
import { TbCake } from 'react-icons/tb';
import { Optional } from 'utility-types';
import { GetTopicsResponseItem } from '../../../api/topic';
import useBackground from '../../../hooks/useBackground';
import useButtonColorScheme from '../../../hooks/useButtonColorScheme';
import useTextColor from '../../../hooks/useTextColor';
import { formatDate } from '../../../utils/dayjs';

export default function TopicSidePanel({
    topic,
    showHeader,
    buttonType = 'create'
}: {
    topic: Optional<GetTopicsResponseItem, '_count'>;
    showHeader?: boolean;
    buttonType?: 'create' | 'join';
}) {
    const background = useBackground();
    const textColor = useTextColor();
    const colorScheme = useButtonColorScheme();

    return (
        <Box boxShadow='md' borderRadius='md' background={background}>
            <Center
                height='12'
                backgroundColor='blue.600'
                display='flex'
                py={1}
                px={3}
                borderTopRadius='md'
                justifyContent='start'
            >
                {!showHeader && (
                    <Text color='white' fontWeight='semibold' fontSize='sm'>
                        About Community
                    </Text>
                )}
            </Center>
            <VStack px={3} py={3} divider={<StackDivider />} gap={2}>
                <VStack align='start' w='full'>
                    {showHeader && (
                        <HStack spacing={1}>
                            <Avatar size='md' name={topic.display_title} src={topic.image_url} />
                            <Text fontWeight='bold' fontSize='md'>
                                a/{topic.display_title}
                            </Text>
                        </HStack>
                    )}
                    <Text fontSize='sm'>{topic.description}</Text>
                    <HStack spacing={1}>
                        <Icon h={6} w={6} as={TbCake} />
                        <Text color={textColor} fontSize='sm'>
                            Created {formatDate(topic.created_at)}
                        </Text>
                    </HStack>
                </VStack>
                <HStack w='full'>
                    <VStack w='50%' align='start' spacing={0}>
                        <Text fontWeight='semibold'>89.0k</Text>
                        <Text fontSize='xs' color={textColor}>
                            Members
                        </Text>
                    </VStack>
                    <VStack w='50%' align='start' spacing={0}>
                        <HStack>
                            <Badge background='green.400' height='2' borderRadius='full'>
                                {' '}
                            </Badge>
                            <Text fontWeight='semibold'>18</Text>
                        </HStack>
                        <Text fontSize='xs' color={textColor}>
                            Online
                        </Text>
                    </VStack>
                </HStack>
                {buttonType === 'create' ? (
                    <Button colorScheme={colorScheme} borderRadius='full' size='sm' variant='solid' w='full'>
                        Create Post
                    </Button>
                ) : (
                    <Button colorScheme={colorScheme} borderRadius='full' size='sm' variant='outline' w='full'>
                        Join
                    </Button>
                )}
            </VStack>
        </Box>
    );
}
