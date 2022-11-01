import { ResponsiveValue } from '@chakra-ui/react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

export enum ModalTypes {
    AUTH_LOGIN = 'AUTH_LOGIN',
    AUTH_SIGNUP = 'AUTH_SIGNUP'
}

type ModalState = {
    is_visible: boolean;
    type: ModalTypes | null;
    size?: ResponsiveValue<
        (string & object) | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'xs' | '3xl' | '4xl' | '5xl' | '6xl'
    >;
};

const initialState: ModalState = {
    is_visible: false,
    type: null,
    size: 'md'
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state, action: PayloadAction<Omit<ModalState, 'is_visible'>>) => {
            state.is_visible = true;
            state.type = action.payload.type;
            state.size = action.payload.size;
        },
        hideModal: (state) => {
            state.is_visible = false;
            state.type = null;
        }
    }
});

export const { showModal, hideModal } = modalSlice.actions;

export const getModalState = (state: RootState) => state.modal;

export default modalSlice.reducer;
