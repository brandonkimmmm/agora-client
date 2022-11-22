import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Divider,
    HStack,
    Icon,
    Input,
    Spinner,
    Text,
    useDisclosure,
    useOutsideClick,
    VStack
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { TbCircleDashed, TbSearch } from 'react-icons/tb';
import { useDebounce, useEffectOnce } from 'usehooks-ts';
import { GetTopicsAvailableResponseItem, useLazyGetTopicsAvailableQuery } from '../../../api/topic';
import useBackground from '../../../hooks/useBackground';
import useBorder from '../../../hooks/useBorder';

export default function PostTopicDropdown({
    topic,
    setTopic
}: {
    topic: GetTopicsAvailableResponseItem | null;
    setTopic: (v: GetTopicsAvailableResponseItem | null) => void;
}) {
    const [trigger, { data, isLoading, isFetching }] = useLazyGetTopicsAvailableQuery();
    const [search, setSearch] = useState<string>('');
    const { onOpen, onClose, isOpen } = useDisclosure();
    const debouncedSearch = useDebounce<string>(search, 300);
    const [borderColor] = useBorder();
    const background = useBackground();
    const ref = useRef(null);

    useOutsideClick({
        ref,
        handler: () => (isOpen ? onClose() : null)
    });

    useEffectOnce(() => {
        trigger({});
    });

    const handleTopicClick = (to: GetTopicsAvailableResponseItem) => {
        setTopic(to);
        setSearch(`a/${to.display_title}`);
        onClose();
    };

    const searchResults = (results: GetTopicsAvailableResponseItem[]) => {
        if (results.length === 0) {
            return (
                <Text px={2} alignSelf='center' fontSize='sm' fontWeight='semibold' color='gray'>
                    No Communities found
                </Text>
            );
        }
        return results.map((t) => (
            <HStack
                px={4}
                key={t.title}
                sx={{
                    _hover: {
                        cursor: 'pointer'
                    }
                }}
                onClick={() => handleTopicClick(t)}
            >
                <Avatar size='sm' name={t.display_title} src={t.image_url} />
                <Text fontSize='sm' fontWeight='bold' color='white'>
                    a/{t.display_title}
                </Text>
            </HStack>
        ));
    };

    const subbedCommunities = (results: GetTopicsAvailableResponseItem[]) => {
        if (results.length === 0) return null;
        return (
            <VStack px={2} align='start' gap={2}>
                <Text fontSize='sm' fontWeight='semibold' color='gray'>
                    Your Communities
                </Text>
                {results.map((t) => (
                    <HStack
                        px={2}
                        key={t.title}
                        sx={{
                            _hover: {
                                cursor: 'pointer'
                            }
                        }}
                        onClick={() => handleTopicClick(t)}
                    >
                        <Avatar size='sm' name={t.display_title} src={t.image_url} />
                        <Text fontSize='sm' fontWeight='bold' color='white'>
                            a/{t.display_title}
                        </Text>
                    </HStack>
                ))}
            </VStack>
        );
    };

    const otherCommunities = (results: GetTopicsAvailableResponseItem[]) => {
        if (results.length === 0) return null;
        return (
            <VStack px={2} align='start' gap={2}>
                <Text fontSize='sm' fontWeight='semibold' color='gray'>
                    Other Communities
                </Text>
                {results.map((t) => (
                    <HStack
                        px={2}
                        key={t.title}
                        sx={{
                            _hover: {
                                cursor: 'pointer'
                            }
                        }}
                        onClick={() => handleTopicClick(t)}
                    >
                        <Avatar size='sm' name={t.display_title} src={t.image_url} />
                        <Text fontSize='sm' fontWeight='bold' color='white'>
                            a/{t.display_title}
                        </Text>
                    </HStack>
                ))}
            </VStack>
        );
    };

    const communitiesList = () => {
        if (!data || isLoading || isFetching) {
            return <Spinner />;
        }

        const searchTopics: GetTopicsAvailableResponseItem[] = [];
        const subTopics: GetTopicsAvailableResponseItem[] = [];
        const otherTopics: GetTopicsAvailableResponseItem[] = [];

        for (const t of data) {
            let isSearch = false;
            if (debouncedSearch.length > 2) {
                const searchTitle = debouncedSearch.startsWith('a/') ? debouncedSearch.substring(2) : debouncedSearch;
                if (
                    t.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
                    t.display_title.toLowerCase().includes(searchTitle.toLowerCase())
                ) {
                    searchTopics.push(t);
                    isSearch = true;
                }
            }
            if (!isSearch) {
                if (t.subscribed) {
                    subTopics.push(t);
                } else {
                    otherTopics.push(t);
                }
            }
        }

        return (
            <VStack
                py={2}
                borderColor={borderColor}
                borderWidth='thin'
                borderBottomRadius='md'
                background={background}
                w='xs'
                align='start'
                maxH='xl'
                overflowY='scroll'
                position='absolute'
                zIndex='1'
            >
                {debouncedSearch.length > 2 && (
                    <>
                        {searchResults(searchTopics)}
                        <Divider />
                    </>
                )}
                {subbedCommunities(subTopics)}
                <Divider />
                {otherCommunities(otherTopics)}
            </VStack>
        );
    };

    const handleOpen = () => {
        onOpen();
        setTopic(null);
    };

    return (
        <Box ref={ref} w='xs'>
            <HStack
                onClick={() => (!isOpen ? handleOpen() : null)}
                borderColor={borderColor}
                borderWidth='thin'
                borderTopRadius='md'
                borderBottomRadius={isOpen ? 'none' : 'md'}
                background={background}
                w='full'
                p={2}
            >
                {topic ? (
                    <Avatar size='xs' name={topic.display_title} src={topic.image_url} />
                ) : (
                    <Icon color='gray' fontSize='2xl' as={isOpen ? TbSearch : TbCircleDashed} />
                )}
                <Input
                    variant='unstyled'
                    placeholder={isOpen ? 'Search communities' : 'Choose a community'}
                    w='full'
                    fontWeight='semibold'
                    color='white'
                    fontSize='sm'
                    sx={{
                        _placeholder: {
                            fontWeight: 'semibold',
                            color: 'white',
                            fontSize: 'sm'
                        }
                    }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Icon color='gray' as={ChevronDownIcon} fontSize='xl' sx={{ _hover: { cursor: 'pointer' } }} />
            </HStack>
            {isOpen && communitiesList()}
        </Box>
    );
}
