import { useMemo } from 'react';
import { useGetTopicSubscriptionsQueryState } from '../api/topic';
import useAuth from './useAuth';

function useTopicSubscribed(title: string) {
    const auth = useAuth();
    const { data } = useGetTopicSubscriptionsQueryState();

    const isSubscribed = auth && data && data.data.some((d) => d.title === title);

    return useMemo(() => isSubscribed, [isSubscribed]);
}

export default useTopicSubscribed;
