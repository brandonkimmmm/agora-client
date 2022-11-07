import { ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Button, Center, HStack, List, ListIcon, ListItem, Skeleton, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from 'usehooks-ts';
import { useLazyGetTopicsQuery } from '../../../api/topic';
import useBackground from '../../../hooks/useBackground';
import useBorder from '../../../hooks/useBorder';
import useButtonColorScheme from '../../../hooks/useButtonColorScheme';
import TrendingTopicListItem from './TrendingTopicListItem';

export default function TrendingTopicList() {
    const [trigger, { data, isLoading, isFetching, isError }] = useLazyGetTopicsQuery();
    const background = useBackground();
    const colorScheme = useButtonColorScheme();
    const navigate = useNavigate();
    const [borderColor] = useBorder();

    useEffectOnce(() => {
        trigger({ limit: 5, page: 1 });
    });

    const handleTopicClick = (title: string) => {
        navigate(`/a/${title}`);
    };

    const getContent = () => {
        if (!data || isLoading || isFetching) {
            return (
                <>
                    <ListItem>
                        <Skeleton h='5' w='full' />
                    </ListItem>
                    <ListItem>
                        <Skeleton h='5' w='full' />
                    </ListItem>
                    <ListItem>
                        <Skeleton h='5' w='full' />
                    </ListItem>
                    <ListItem>
                        <Skeleton h='5' w='full' />
                    </ListItem>
                    <ListItem>
                        <Skeleton h='5' w='full' />
                    </ListItem>
                    <ListItem>
                        <Skeleton h='10' w='full' />
                    </ListItem>
                </>
            );
        }

        if (data.count === 0) {
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
            <>
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
                            <TrendingTopicListItem topic={d} />
                        </HStack>
                    </ListItem>
                ))}
                <Button colorScheme={colorScheme} size='sm' w='full'>
                    View All
                </Button>
            </>
        );
    };

    return (
        <Box boxShadow='md' borderRadius='md' background={background} border='1px' borderColor={borderColor}>
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
                <List spacing={4}>{getContent()}</List>
            </Box>
        </Box>
    );
}
