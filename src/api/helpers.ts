import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { get } from 'lodash';

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return typeof error === 'object' && error != null && 'status' in error;
};

export const getErrorMessage = (error: unknown) => {
    if (isFetchBaseQueryError(error)) {
        const errMsg = 'error' in error ? error.error : (error as any).data?.message || 'Something went wrong!';
        return errMsg;
    }
    return get(error, 'message') || 'Something went wrong!';
};
