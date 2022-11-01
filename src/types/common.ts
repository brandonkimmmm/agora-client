export type SuccessResponse = {
    message: string;
};

export interface PaginationRequestParams {
    limit?: number;
    page?: number;
}

export interface PaginationResponseData<T> {
    count: number;
    data: T[];
}
