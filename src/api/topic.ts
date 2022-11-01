import api from '../redux/rtk';
import { ITopic, IUser, PaginationRequestParams, PaginationResponseData } from '../types';

export interface GetTopicsResponseItem extends ITopic {
    user: Pick<IUser, 'id' | 'username'>;
    _count: {
        posts: number;
    };
}

type GetTopicsResponse = PaginationResponseData<GetTopicsResponseItem>;

type GetTopicsParams = PaginationRequestParams;

export const topicApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTopics: builder.query<GetTopicsResponse, GetTopicsParams>({
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
