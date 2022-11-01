import api from '../redux/rtk';

type GetUsersResponse = {
    name: string;
    version: string;
};

export const publicApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getHealth: builder.query<GetUsersResponse, void>({
            query: () => ({
                url: '/health'
            })
        })
    })
});

export const { useLazyGetHealthQuery } = publicApi;
