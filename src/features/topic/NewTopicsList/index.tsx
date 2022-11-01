import { ChevronUpIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Center,
    HStack,
    List,
    ListIcon,
    ListItem,
    Spinner,
    Text,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react';
import { useEffectOnce } from 'usehooks-ts';
import { useLazyGetTopicsQuery } from '../../../api/topic';
import NewTopicListItem from './NewTopicListItem';

export default function NewTopicsList() {
    const [trigger, { data, isLoading, isFetching, isError }] = useLazyGetTopicsQuery();
    const background = useColorModeValue('gray.50', 'black.900');
    const { colorMode } = useColorMode();

    useEffectOnce(() => {
        trigger({ limit: 5, page: 1 });
    });

    if (!data || isLoading || isFetching) {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }

    if (data.data.length === 0) {
        return (
            <Center>
                <Text>No data found!</Text>
            </Center>
        );
    }

    if (isError) {
        return (
            <Center>
                <Text>Error</Text>
            </Center>
        );
    }

    return (
        <Box boxShadow='md' borderRadius='md' background={background}>
            <Box
                height='24'
                backgroundImage="linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(40, 40, 40, 0.73)), url('/agora-vector-bg.jpg')"
                backgroundPosition='center'
                backgroundSize='cover'
                display='flex'
                alignItems='end'
                py={1}
                px={3}
                borderTopRadius='md'
            >
                <Text color='gray.50' fontWeight='semibold' fontSize='md'>
                    Today&apos;s Top Growing Communities
                </Text>
            </Box>
            <Box p={4}>
                <List spacing={4}>
                    {data.data.map((d, i) => (
                        <ListItem key={d.id}>
                            <HStack>
                                <Text>{i + 1}</Text>
                                <ListIcon as={ChevronUpIcon} color='green' />
                                <NewTopicListItem topic={d} />
                            </HStack>
                        </ListItem>
                    ))}
                    <Button colorScheme={colorMode === 'light' ? 'blue' : 'gray'} size='sm' w='full'>
                        View All
                    </Button>
                </List>
            </Box>
        </Box>
    );
}
