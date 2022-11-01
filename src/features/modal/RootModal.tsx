import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useBackground from '../../hooks/useBackground';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
// import Profile from '../auth/Profile';
import { getModalState, hideModal } from './modalSlice';

export default function RootModal() {
    const dispatch = useAppDispatch();
    const { is_visible, type, size } = useAppSelector(getModalState);
    const background = useBackground();

    const getModalBody = () => {
        switch (type) {
            case 'AUTH_SIGNUP':
                return <SignupForm />;
            case 'AUTH_LOGIN':
                return <LoginForm />;
            default:
                return null;
        }
    };

    const getHeader = () => {
        switch (type) {
            case 'AUTH_LOGIN':
                return 'Login';
            case 'AUTH_SIGNUP':
                return 'Signup';
            default:
                return null;
        }
    };

    return (
        <Modal isOpen={is_visible && !!type} onClose={() => dispatch(hideModal())} size={size}>
            <ModalOverlay backdropFilter='blur(2px)' />
            <ModalContent background={background}>
                <ModalHeader>{getHeader()}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={10}>{getModalBody()}</ModalBody>
            </ModalContent>
        </Modal>
    );
}
