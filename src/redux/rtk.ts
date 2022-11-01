import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/constants';

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL
});

const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    const result = await baseQuery(args, api, extraOptions);
    return result;
};

const emptySplitApi = createApi({
    baseQuery: baseQueryWithAuth,
    tagTypes: ['UNAUTHORIZED', 'UNKNOWN_ERROR', 'Topic', 'Post'],
    endpoints: () => ({})
});

export default emptySplitApi;
