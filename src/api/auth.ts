import api from '../redux/rtk';
import { IUser, SuccessResponse } from '../types';

interface PostLoginBody {
    username: string;
    password: string;
}

interface PostLoginResponse {
    token: string;
    user: IUser;
}

interface PostSignupBody extends PostLoginBody {
    password_confirmation: string;
}

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<PostLoginResponse, PostLoginBody>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            })
        }),
        signup: builder.mutation<SuccessResponse, PostSignupBody>({
            query: (body) => ({
                url: '/signup',
                method: 'POST',
                body
            })
        }),
        checkToken: builder.query<IUser, string>({
            query: (token) => ({
                url: '/check-token',
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        })
    })
});

export const { useLoginMutation, useLazyCheckTokenQuery, useSignupMutation } = authApi;
