import { omit } from 'lodash';
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
    _sum: {
        votes: number;
    };
    post: Pick<IPost, 'id'>;
    user_vote: IVote['value'] | null;
}

type GetPostCommentsResponse = PaginationResponseData<GetPostCommentsResponseItem>;

interface GetPostCommentsParams extends PaginationRequestParams {
    post_id: number;
}

export type GetPostsResponse = PaginationResponseData<GetPostsResponseItem>;

interface GetPostsParams extends PaginationRequestParams {
    topic_id?: number;
    user_id?: number;
    topic_title?: string;
    post_id?: number;
}

type PutPostVoteResponse = Pick<GetPostsResponseItem, 'id' | '_sum' | 'user_vote'> & {
    topic: Pick<ITopic, 'id' | 'title' | 'display_title'>;
};

type PutPostCommentVoteResponse = Pick<GetPostCommentsResponseItem, 'id' | '_sum' | 'user_vote'>;

type PutPostCommentVoteParams = {
    post_id: number;
    comment_id: number;
};

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
        putPostUpvote: builder.mutation<PutPostVoteResponse, number>({
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
                                Object.assign(draft.data[index], omit(data, 'topic'));
                            }
                        })
                    );
                    dispatch(
                        postApi.util.updateQueryData('getPosts', { post_id: postId }, (draft) => {
                            Object.assign(draft.data[0], omit(data, 'topic'));
                        })
                    );
                    dispatch(
                        postApi.util.updateQueryData('getPosts', { topic_title: data.topic.display_title }, (draft) => {
                            const index = draft.data.findIndex((i) => i.id === postId);
                            if (index > -1) {
                                Object.assign(draft.data[index], omit(data, 'topic'));
                            }
                        })
                    );
                } catch {
                    //
                }
            }
        }),
        putPostDownvote: builder.mutation<PutPostVoteResponse, number>({
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
                                Object.assign(draft.data[index], omit(data, 'topic'));
                            }
                        })
                    );
                    dispatch(
                        postApi.util.updateQueryData('getPosts', { post_id: postId }, (draft) => {
                            Object.assign(draft.data[0], omit(data, 'topic'));
                        })
                    );
                    dispatch(
                        postApi.util.updateQueryData('getPosts', { topic_title: data.topic.display_title }, (draft) => {
                            const index = draft.data.findIndex((i) => i.id === postId);
                            if (index > -1) {
                                Object.assign(draft.data[index], omit(data, 'topic'));
                            }
                        })
                    );
                } catch {
                    //
                }
            }
        }),
        putPostResetVote: builder.mutation<PutPostVoteResponse, number>({
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
                                Object.assign(draft.data[index], omit(data, 'topic'));
                            }
                        })
                    );
                    dispatch(
                        postApi.util.updateQueryData('getPosts', { post_id: postId }, (draft) => {
                            Object.assign(draft.data[0], omit(data, 'topic'));
                        })
                    );
                    dispatch(
                        postApi.util.updateQueryData('getPosts', { topic_title: data.topic.display_title }, (draft) => {
                            const index = draft.data.findIndex((i) => i.id === postId);
                            if (index > -1) {
                                Object.assign(draft.data[index], omit(data, 'topic'));
                            }
                        })
                    );
                } catch {
                    //
                }
            }
        }),
        putPostCommentUpvote: builder.mutation<PutPostCommentVoteResponse, PutPostCommentVoteParams>({
            query: ({ post_id, comment_id }) => ({
                url: `/posts/${post_id}/comments/${comment_id}/vote/up`,
                method: 'PUT'
            }),
            async onQueryStarted({ post_id, comment_id }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        postApi.util.updateQueryData('getPostComments', { post_id }, (draft) => {
                            const index = draft.data.findIndex((i) => i.id === comment_id);
                            if (index > -1) {
                                Object.assign(draft.data[index], data);
                            }
                        })
                    );
                } catch {
                    //
                }
            }
        }),
        putPostCommentDownvote: builder.mutation<PutPostCommentVoteResponse, PutPostCommentVoteParams>({
            query: ({ post_id, comment_id }) => ({
                url: `/posts/${post_id}/comments/${comment_id}/vote/down`,
                method: 'PUT'
            }),
            async onQueryStarted({ post_id, comment_id }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        postApi.util.updateQueryData('getPostComments', { post_id }, (draft) => {
                            const index = draft.data.findIndex((i) => i.id === comment_id);
                            if (index > -1) {
                                Object.assign(draft.data[index], data);
                            }
                        })
                    );
                } catch {
                    //
                }
            }
        }),
        putPostCommentResetVote: builder.mutation<PutPostCommentVoteResponse, PutPostCommentVoteParams>({
            query: ({ post_id, comment_id }) => ({
                url: `/posts/${post_id}/comments/${comment_id}/vote/reset`,
                method: 'PUT'
            }),
            async onQueryStarted({ post_id, comment_id }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        postApi.util.updateQueryData('getPostComments', { post_id }, (draft) => {
                            const index = draft.data.findIndex((i) => i.id === comment_id);
                            if (index > -1) {
                                Object.assign(draft.data[index], data);
                            }
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
    useGetPostsQuery,
    useLazyGetPostsQuery,
    useLazyGetPostCommentsQuery,
    usePutPostDownvoteMutation,
    usePutPostUpvoteMutation,
    usePutPostResetVoteMutation,
    usePutPostCommentDownvoteMutation,
    usePutPostCommentResetVoteMutation,
    usePutPostCommentUpvoteMutation
} = postApi;
