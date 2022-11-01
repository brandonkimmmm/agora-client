import { IUser } from './user';

export interface IVote {
    id: number;
    user: Pick<IUser, 'id' | 'username'>;
    value: number;
}
