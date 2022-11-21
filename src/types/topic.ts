export interface ITopic {
    id: number;
    title: string;
    display_title: string;
    description: string;
    image_url?: string;
    created_at: Date;
    updated_at: Date;
}

export interface IPost {
    id: number;
    title: string;
    body?: string;
    media_url?: string;
    link_url?: string;
    created_at: Date;
    updated_at: Date;
}

export interface IComment {
    id: number;
    body: string;
    created_at: Date;
    updated_at: Date;
}
