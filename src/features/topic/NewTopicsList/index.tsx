import { ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Button, Center, HStack, List, ListIcon, ListItem, Spinner, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from 'usehooks-ts';
import { useLazyGetTopicsQuery } from '../../../api/topic';
import useBackground from '../../../hooks/useBackground';
import useButtonColorScheme from '../../../hooks/useButtonColorScheme';
import NewTopicListItem from './NewTopicListItem';

export default function NewTopicsList() {
    const [trigger, { data, isLoading, isFetching, isError }] = useLazyGetTopicsQuery();
    const background = useBackground();
    const colorScheme = useButtonColorScheme();
    const navigate = useNavigate();

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

    const handleTopicClick = (title: string) => {
        navigate(`/a/${title}`);
    };

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
                        <ListItem
                            key={d.id}
                            onClick={() => handleTopicClick(d.display_title)}
                            sx={{
                                _hover: {
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            <HStack>
                                <Text>{i + 1}</Text>
                                <ListIcon as={ChevronUpIcon} color='green' />
                                <NewTopicListItem topic={d} />
                            </HStack>
                        </ListItem>
                    ))}
                    <Button colorScheme={colorScheme} size='sm' w='full'>
                        View All
                    </Button>
                </List>
            </Box>
        </Box>
    );
}
