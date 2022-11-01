import { Action, AnyAction, combineReducers, configureStore, Reducer, ThunkAction } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import modalReducer from '../features/modal/modalSlice';
import api from './rtk';

const appReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    modal: modalReducer,
    auth: authReducer
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
    if (action.type === 'auth/resetAuth') {
        state = {} as RootState;
    }
    return appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
