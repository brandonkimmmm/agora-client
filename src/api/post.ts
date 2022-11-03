import api from '../redux/rtk';
import { IPost, ITopic, IUser, PaginationRequestParams, PaginationResponseData } from '../types';

export interface GetPostsResponseItem extends IPost {
    user: Pick<IUser, 'id' | 'username'>;
    topic: ITopic & {
        user: Pick<IUser, 'id' | 'username'>;
    };
    _count: {
        comments: number;
    };
    _sum: {
        votes: number;
    };
}

type GetPostsResponse = PaginationResponseData<GetPostsResponseItem>;

interface GetPostsParams extends PaginationRequestParams {
    topic_id?: number;
    user_id?: number;
    topic_title?: string;
    post_id?: number;
}

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<GetPostsResponse, GetPostsParams>({
            query: (params) => ({
                url: '/posts',
                params
            }),
            providesTags: (result, error, arg) =>
                result ? [...result.data.map(({ id }) => ({ type: 'Post' as const, id })), 'Post'] : ['Post']
        })
    })
});

export const { useLazyGetPostsQuery } = postApi;
