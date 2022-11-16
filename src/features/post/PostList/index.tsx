/* eslint-disable react-hooks/exhaustive-deps */

import { Box, Center, List, ListItem, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useEffectOnce, useIntersectionObserver } from 'usehooks-ts';
import { GetPostsResponseItem, useLazyGetPostsQuery } from '../../../api/post';
import PostListItem from './PostListItem';
import PostListItemSkeleton from './PostListItemSkeleton';

export default function PostList({
    title,
    showTopic,
    showFull,
    showCommentForm,
    hideJoin
}: {
    title?: string;
    showTopic?: boolean;
    showFull?: boolean;
    showCommentForm?: boolean;
    hideJoin?: boolean;
}) {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<GetPostsResponseItem[]>([]);
    const [trigger] = useLazyGetPostsQuery();
    const [isRendering, setIsRendering] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const ref = useRef(null);
    const entry = useIntersectionObserver(ref, {});
    const isVisible = !!entry?.isIntersecting;
    const [isEnd, setIsEnd] = useState(false);
    let isGettingNext = false;

    const getNextPosts = async () => {
        try {
            const { count, data } = await trigger({ topic_title: title, limit: 10, page: page + 1 }).unwrap();
            setPage((p) => p + 1);
            const newPosts = [...posts, ...data];
            setPosts(newPosts);
            if (newPosts.length === count) setIsEnd(true);
        } catch (err) {
            setIsError(true);
        }
    };

    useEffect(() => {
        (async () => {
            if (isVisible && !isGettingNext && !isRendering && !isError && !isEmpty) {
                isGettingNext = true;
                await getNextPosts();
                isGettingNext = false;
            }
        })();
    }, [isVisible]);

    useEffectOnce(() => {
        (async () => {
            window.scrollTo(0, 0);
            try {
                const { count, data } = await trigger({ topic_title: title, limit: 10, page }).unwrap();
                if (count === 0) setIsEmpty(true);
                setPosts(data);
                setIsRendering(false);
            } catch (err) {
                setIsError(true);
            }
        })();
    });

    const getContent = () => {
        if (isRendering) {
            return (
                <>
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                    <PostListItemSkeleton />
                </>
            );
        }

        if (isEmpty) {
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
                {posts.map((d) => (
                    <ListItem key={d.id}>
                        <PostListItem
                            post={d}
                            showTopic={showTopic}
                            showCommentForm={showCommentForm}
                            showFull={showFull}
                            hideJoin={hideJoin}
                        />
                    </ListItem>
                ))}
            </>
        );
    };

    return (
        <List w='full' spacing={4}>
            {getContent()}
            {!isEnd && (
                <Box ref={ref}>
                    <PostListItemSkeleton />
                </Box>
            )}
        </List>
    );
}
