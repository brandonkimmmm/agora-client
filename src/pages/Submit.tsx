import { useNavigate } from 'react-router-dom';
import PostCreate from '../features/post/PostCreate';
import PostCreateRules from '../features/post/PostCreateRules';
import useAuth from '../hooks/useAuth';
import GridContainer from '../layout/GridContainer';
import MainContainer from '../layout/MainContainer';

export default function Submit() {
    const auth = useAuth();
    const navigate = useNavigate();

    if (!auth) {
        navigate('/');
    }

    return (
        <MainContainer>
            <GridContainer sx={{ pt: 8 }} mainContent={<PostCreate />} sideContent={<PostCreateRules />} />
        </MainContainer>
    );
}
