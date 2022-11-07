import { TriangleDownIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Center,
    Divider,
    List,
    ListItem,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    Text,
    VStack
} from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import { useLazyGetPostCommentsQuery } from '../../../api/post';
import PostCommentListItem from './PostCommentListItem';
import PostCommentListItemSkeleton from './PostCommentListItemSkeleton';

export default function PostCommentList({ postId }: { postId: number }) {
    const [filter, setFilter] = useState<string>('best');
    const [trigger, { data, isLoading, isFetching, isError }] = useLazyGetPostCommentsQuery();

    useEffectOnce(() => {
        trigger({ post_id: postId });
    });

    const getCommentsBody = () => {
        if (!data || isLoading || isFetching) {
            return (
                <>
                    <ListItem>
                        <PostCommentListItemSkeleton />
                    </ListItem>
                    <ListItem>
                        <PostCommentListItemSkeleton />
                    </ListItem>
                    <ListItem>
                        <PostCommentListItemSkeleton />
                    </ListItem>
                    <ListItem>
                        <PostCommentListItemSkeleton />
                    </ListItem>
                    <ListItem>
                        <PostCommentListItemSkeleton />
                    </ListItem>
                    <ListItem>
                        <PostCommentListItemSkeleton />
                    </ListItem>
                    <ListItem>
                        <PostCommentListItemSkeleton />
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
                    <ListItem key={d.id}>
                        <PostCommentListItem comment={d} />
                    </ListItem>
                ))}
            </>
        );
    };

    return (
        <VStack w='full' align='start' my={8}>
            <Box pl='8' w='full'>
                <Menu>
                    <MenuButton size='xs' as={Button} rightIcon={<TriangleDownIcon />}>
                        Sort by: {capitalize(filter)}
                    </MenuButton>
                    <MenuList minWidth='fit-content'>
                        <MenuOptionGroup defaultValue='best' type='radio'>
                            <MenuItemOption fontSize='xs' value='best' onClick={() => setFilter('best')}>
                                Best
                            </MenuItemOption>
                            <MenuItemOption fontSize='xs' value='top' onClick={() => setFilter('top')}>
                                Top
                            </MenuItemOption>
                            <MenuItemOption fontSize='xs' value='new' onClick={() => setFilter('new')}>
                                New
                            </MenuItemOption>
                            <MenuItemOption
                                fontSize='xs'
                                value='controversial'
                                onClick={() => setFilter('controversial')}
                            >
                                Controversial
                            </MenuItemOption>
                            <MenuItemOption fontSize='xs' value='old' onClick={() => setFilter('old')}>
                                Old
                            </MenuItemOption>
                            <MenuItemOption fontSize='xs' value='q&a' onClick={() => setFilter('q&a')}>
                                Q&A
                            </MenuItemOption>
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>
                <Divider w='full' mt={4} />
            </Box>
            <List w='full' spacing={10} pt={2}>
                {getCommentsBody()}
            </List>
        </VStack>
    );
}
