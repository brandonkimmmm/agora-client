import {
    Badge,
    Box,
    Button,
    Center,
    HStack,
    Icon,
    StackDivider,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import { TbCake } from 'react-icons/tb';
import { Optional } from 'utility-types';
import { GetTopicsResponseItem } from '../../../api/topic';
import useBackground from '../../../hooks/useBackground';
import useButtonColorScheme from '../../../hooks/useButtonColorScheme';
import useTextColor from '../../../hooks/useTextColor';
import { formatDate } from '../../../utils/dayjs';

export default function TopicSidePanel({ topic }: { topic: Optional<GetTopicsResponseItem, '_count'> }) {
    const background = useBackground();
    const backgroundColor = useColorModeValue('blue.600', 'black.900');
    const textColor = useTextColor();
    const headerColor = useColorModeValue('white', 'whiteAlpha.500');
    const colorScheme = useButtonColorScheme();

    return (
        <Box boxShadow='md' borderRadius='md' background={background}>
            <Center
                height='12'
                backgroundColor={backgroundColor}
                display='flex'
                py={1}
                px={3}
                borderTopRadius='md'
                justifyContent='start'
            >
                <Text color={headerColor} fontWeight='semibold' fontSize='sm'>
                    About Community
                </Text>
            </Center>
            <VStack px={3} py={3} divider={<StackDivider />} gap={2}>
                <VStack align='start' w='full'>
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
                <Button colorScheme={colorScheme} borderRadius='full' size='sm' variant='solid' w='full'>
                    Create Post
                </Button>
            </VStack>
        </Box>
    );
}
