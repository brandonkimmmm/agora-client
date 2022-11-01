import api from '../redux/rtk';
import { ITopic, IUser, PaginationRequestParams, PaginationResponseData } from '../types';

interface GetTopicsResponse extends PaginationResponseData<ITopic> {
    user: Pick<IUser, 'id' | 'username'>;
    _count: {
        posts: number;
    };
}

export const topicApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTopics: builder.query<GetTopicsResponse, PaginationRequestParams>({
            query: (params) => ({
                url: '/topics',
                params
            }),
            providesTags: (result, error, arg) =>
                result ? [...result.data.map(({ id }) => ({ type: 'Topic' as const, id })), 'Topic'] : ['Topic']
        })
    })
});

export const { useLazyGetTopicsQuery } = topicApi;
