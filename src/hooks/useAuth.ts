import { useMemo } from 'react';
import { getCurrentUser } from '../features/auth/authSlice';
import { useAppSelector } from './redux';

function useAuth() {
    const user = useAppSelector(getCurrentUser);
    return useMemo(() => user, [user]);
}

export default useAuth;
