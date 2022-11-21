import api from '../redux/rtk';
import { ITopic, IUser, PaginationRequestParams, PaginationResponseData } from '../types';

export interface GetTopicsResponseItem extends ITopic {
    user: Pick<IUser, 'id' | 'username'>;
    _count: {
        posts: number;
    };
}

type GetTopicsResponse = PaginationResponseData<GetTopicsResponseItem>;

interface GetTopicsParams extends PaginationRequestParams {
    display_title?: string;
}

type GetUserTopicsResponseItem = Pick<ITopic, 'id' | 'title' | 'display_title' | 'image_url'>;

export type GetUserTopicsResponse = PaginationResponseData<GetUserTopicsResponseItem>;

export type GetTopicsAvailableResponse = Pick<ITopic, 'id' | 'title' | 'display_title' | 'image_url'> &
    {
        subscribed?: boolean;
    }[];

type GetTopicsAvailableParams = {
    search?: string;
};

export const topicApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTopics: builder.query<GetTopicsResponse, GetTopicsParams>({
            query: (params) => ({
                url: '/topics',
                params
            }),
            providesTags: (result, error, arg) =>
                result ? [...result.data.map(({ id }) => ({ type: 'Topic' as const, id })), 'Topic'] : ['Topic']
        }),
        getTopicsAvailable: builder.query<GetTopicsAvailableResponse, GetTopicsAvailableParams>({
            query: (params) => ({
                url: '/topics/available',
                params
            })
        }),
        getTopicSubscriptions: builder.query<GetUserTopicsResponse, void>({
            query: () => ({
                url: '/topics/subscriptions',
                method: 'GET'
            })
        }),
        putTopicSubscribe: builder.mutation<GetUserTopicsResponseItem, string>({
            query: (title) => ({
                url: `/topics/${title}/subscribe`,
                method: 'PUT'
            }),
            async onQueryStarted(title, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        topicApi.util.updateQueryData('getTopicSubscriptions', undefined, (draft) => {
                            draft.count += 1;
                            draft.data.push(data);
                        })
                    );
                } catch {
                    //
                }
            }
        }),
        putTopicUnsubscribe: builder.mutation<GetUserTopicsResponseItem, string>({
            query: (title) => ({
                url: `/topics/${title}/unsubscribe`,
                method: 'PUT'
            }),
            async onQueryStarted(title, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        topicApi.util.updateQueryData('getTopicSubscriptions', undefined, (draft) => {
                            draft.count -= 1;
                            draft.data = draft.data.filter((d) => d.title !== data.title);
                        })
                    );
                } catch {
                    //
                }
            }
        })
    })
});

export const {
    useLazyGetTopicsQuery,
    useLazyGetTopicSubscriptionsQuery,
    endpoints: {
        getTopicSubscriptions: { useQueryState: useGetTopicSubscriptionsQueryState }
    },
    usePutTopicSubscribeMutation,
    usePutTopicUnsubscribeMutation,
    useLazyGetTopicsAvailableQuery
} = topicApi;
