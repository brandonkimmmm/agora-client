import z from 'zod';
import { PASSWORD_REGEX } from '../../config/constants';

export const loginSchema = z.object({
    username: z.string().min(4).max(10),
    password: z.string().regex(PASSWORD_REGEX.FULL, 'Invalid password')
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signupSchema = loginSchema
    .extend({
        password_confirmation: z.string()
    })
    .superRefine(({ password_confirmation, password }, ctx) => {
        if (password !== password_confirmation) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords do not match',
                path: ['password_confirmation']
            });
        }
    });

export type SignupSchema = z.infer<typeof signupSchema>;
