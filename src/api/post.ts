import api from '../redux/rtk';
import { IComment, IPost, ITopic, IUser, IVote, PaginationRequestParams, PaginationResponseData } from '../types';

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
    user_vote: IVote['value'] | null;
}

export interface GetPostCommentsResponseItem extends IComment {
    user: Pick<IUser, 'id' | 'username'>;
}

type GetPostCommentsResponse = PaginationResponseData<GetPostCommentsResponseItem>;

interface GetPostCommentsParams extends PaginationRequestParams {
    post_id: number;
}

type GetPostsResponse = PaginationResponseData<GetPostsResponseItem>;

interface GetPostsParams extends PaginationRequestParams {
    topic_id?: number;
    user_id?: number;
    topic_title?: string;
    post_id?: number;
}

type PutVoteResponse = Pick<GetPostsResponseItem, 'id' | '_sum' | 'user_vote'>;

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query<GetPostsResponse, GetPostsParams>({
            query: (params) => ({
                url: '/posts',
                params
            }),
            providesTags: (result, error, arg) =>
                result ? [...result.data.map(({ id }) => ({ type: 'Post' as const, id })), 'Post'] : ['Post']
        }),
        getPostComments: builder.query<GetPostCommentsResponse, GetPostCommentsParams>({
            query: ({ post_id, ...params }) => ({
                url: `/posts/${post_id}/comments`,
                params
            }),
            providesTags: (result, error, arg) =>
                result ? [...result.data.map(({ id }) => ({ type: 'Comment' as const, id })), 'Comment'] : ['Comment']
        }),
        putPostUpvote: builder.mutation<PutVoteResponse, number>({
            query: (postId) => ({
                url: `/posts/${postId}/vote/up`,
                method: 'PUT'
            }),
            async onQueryStarted(postId, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        postApi.util.updateQueryData('getPosts', {}, (draft) => {
                            const index = draft.data.findIndex((i) => i.id === postId);
                            if (index > -1) {
                                Object.assign(draft.data[index], data);
                            }
                        })
                    );
                    dispatch(
                        postApi.util.updateQueryData('getPosts', { post_id: postId }, (draft) => {
                            Object.assign(draft.data[0], data);
                        })
                    );
                } catch {
                    //
                }
            }
        }),
        putPostDownvote: builder.mutation<PutVoteResponse, number>({
            query: (postId) => ({
                url: `/posts/${postId}/vote/down`,
                method: 'PUT'
            }),
            async onQueryStarted(postId, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        postApi.util.updateQueryData('getPosts', {}, (draft) => {
                            const index = draft.data.findIndex((i) => i.id === postId);
                            if (index > -1) {
                                Object.assign(draft.data[index], data);
                            }
                        })
                    );
                    dispatch(
                        postApi.util.updateQueryData('getPosts', { post_id: postId }, (draft) => {
                            Object.assign(draft.data[0], data);
                        })
                    );
                } catch {
                    //
                }
            }
        }),
        putPostResetVote: builder.mutation<PutVoteResponse, number>({
            query: (postId) => ({
                url: `/posts/${postId}/vote/reset`,
                method: 'PUT'
            }),
            async onQueryStarted(postId, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        postApi.util.updateQueryData('getPosts', {}, (draft) => {
                            const index = draft.data.findIndex((i) => i.id === postId);
                            if (index > -1) {
                                Object.assign(draft.data[index], data);
                            }
                        })
                    );
                    dispatch(
                        postApi.util.updateQueryData('getPosts', { post_id: postId }, (draft) => {
                            Object.assign(draft.data[0], data);
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
    useLazyGetPostsQuery,
    useLazyGetPostCommentsQuery,
    usePutPostDownvoteMutation,
    usePutPostUpvoteMutation,
    usePutPostResetVoteMutation
} = postApi;
