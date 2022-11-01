import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';
import type { IUser } from '../../types';

type AuthState = {
    user: IUser | null;
    token: string | null;
};

const initialState: AuthState = {
    user: null,
    token: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state) => {
            localStorage.removeItem('token');
            state.user = null;
            state.token = null;
        },
        setCredentials: (state, action: PayloadAction<Partial<AuthState>>) => {
            if (action.payload.user) {
                state.user = action.payload.user;
            }
            if (action.payload.token) {
                state.token = action.payload.token;
            }
        }
    }
});

export const { resetAuth, setCredentials } = authSlice.actions;

export const getCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
