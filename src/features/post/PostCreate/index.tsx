import { Box, HStack, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { CgFileDocument } from 'react-icons/cg';
import { FiImage, FiLink } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import { useEffectOnce } from 'usehooks-ts';
import { GetTopicsAvailableResponseItem } from '../../../api/topic';
import useBackground from '../../../hooks/useBackground';
import useTextColor from '../../../hooks/useTextColor';
import PostCreateHeader from './PostCreateHeader';
import PostCreateLinkForm from './PostCreateLinkForm';
import PostCreateMediaForm from './PostCreateMediaForm';
import PostCreateTextForm from './PostCreateTextForm';
import PostTopicDropdown from './PostTopicDropdown';

export default function PostCreate() {
    const background = useBackground();
    const textColor = useTextColor();
    const [topic, setTopic] = useState<GetTopicsAvailableResponseItem | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [tabIndex, setTabIndex] = useState(0);

    useEffectOnce(() => {
        if (searchParams.get('type') === 'text') {
            setTabIndex(0);
        } else if (searchParams.get('type') === 'media') {
            setTabIndex(1);
        } else {
            setTabIndex(2);
        }
    });

    const handleTabChange = (index: number) => {
        setTabIndex(index);
        if (index === 0) {
            searchParams.set('type', 'text');
        } else if (index === 1) {
            searchParams.set('type', 'media');
        } else {
            searchParams.set('type', 'link');
        }
        setSearchParams(searchParams);
    };

    return (
        <Box w='full'>
            <PostCreateHeader />
            <PostTopicDropdown topic={topic} setTopic={setTopic} />
            <Tabs background={background} borderRadius='md' mt={4} index={tabIndex} onChange={handleTabChange}>
                <TabList>
                    <Tab py={3} color={textColor} _selected={{ borderColor: 'white', color: 'white' }}>
                        <HStack>
                            <Icon w={5} h={5} as={CgFileDocument} />
                            <Text fontSize='sm' fontWeight='bold'>
                                Post
                            </Text>
                        </HStack>
                    </Tab>
                    <Tab py={3} color={textColor} _selected={{ borderColor: 'white', color: 'white' }}>
                        <HStack>
                            <Icon w={5} h={5} as={FiImage} />
                            <Text fontSize='sm' fontWeight='bold'>
                                Images & Video
                            </Text>
                        </HStack>
                    </Tab>
                    <Tab py={3} color={textColor} _selected={{ borderColor: 'white', color: 'white' }}>
                        <HStack>
                            <Icon w={5} h={5} as={FiLink} />
                            <Text fontSize='sm' fontWeight='bold'>
                                Link
                            </Text>
                        </HStack>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <PostCreateTextForm topic={topic} />
                    </TabPanel>
                    <TabPanel>
                        <PostCreateMediaForm topic={topic} />
                    </TabPanel>
                    <TabPanel>
                        <PostCreateLinkForm topic={topic} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
