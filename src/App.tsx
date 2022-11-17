import { WarningTwoIcon } from '@chakra-ui/icons';
import { Center, Spinner, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffectOnce } from 'usehooks-ts';
import { useLazyCheckTokenQuery } from './api/auth';
import { useLazyGetHealthQuery } from './api/public';
import { useLazyGetTopicSubscriptionsQuery } from './api/topic';
import { setCredentials } from './features/auth/authSlice';
import RootModal from './features/modal/RootModal';
import { useAppDispatch } from './hooks/redux';
import Home from './pages/Home';
import Post from './pages/Post';
import Submit from './pages/Submit';
import Topic from './pages/Topic';

function App() {
    const [isRendering, setIsRendering] = useState(true);
    const [checkToken] = useLazyCheckTokenQuery();
    const [isError, setIsError] = useState(false);
    const [trigger] = useLazyGetHealthQuery();
    const dispatch = useAppDispatch();
    const [getUserTopics] = useLazyGetTopicSubscriptionsQuery();

    useEffectOnce(() => {
        (async () => {
            try {
                await trigger().unwrap();
                const token = localStorage.getItem('token');
                if (token) {
                    try {
                        const user = await checkToken(token).unwrap();
                        await dispatch(
                            setCredentials({
                                user,
                                token
                            })
                        );
                        await getUserTopics();
                    } catch (err) {
                        localStorage.removeItem('token');
                    }
                }
                setIsRendering(false);
            } catch (err) {
                setIsRendering(false);
                setIsError(true);
            }
        })();
    });

    if (isRendering) {
        return (
            <Center flexDirection='column' h='100vh' gap={5}>
                <Spinner size='xl' />
                <Text fontSize='xl' fontWeight='bold'>
                    Loading Agora...
                </Text>
            </Center>
        );
    }

    if (isError) {
        return (
            <Center flexDirection='column' h='100vh' gap={5}>
                <WarningTwoIcon height={50} width={50} />
                <Text fontSize='2xl' fontWeight='bold'>
                    Agora is not available at this time. Please try again later.
                </Text>
            </Center>
        );
    }

    return (
        <>
            <RootModal />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/a/:topic' element={<Topic />} />
                <Route path='/a/:topic/comments/:post_id' element={<Post />} />
                <Route path='/submit' element={<Submit />} />
            </Routes>
        </>
    );
}

export default App;
