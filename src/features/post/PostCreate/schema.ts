import z from 'zod';

export const createPostSchema = z.object({
    title: z.string().min(1).max(300),
    body: z.string().min(0).max(1000).optional(),
    media_url: z.string().url(),
    link_url: z.string().url()
});

export const createPostTextSchema = createPostSchema.pick({
    title: true,
    body: true
});

export type CreatePostTextSchema = z.infer<typeof createPostTextSchema>;

export const createPostMediaSchema = createPostSchema.pick({ title: true, media_url: true });

export type CreatePostMediaSchema = z.infer<typeof createPostMediaSchema>;

export const createPostLinkSchema = createPostSchema.pick({ title: true, link_url: true });

export type CreatePostLinkSchema = z.infer<typeof createPostLinkSchema>;
