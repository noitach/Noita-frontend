// Dependencies
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

// Components
import LoginForm from '../../organisms/LoginForm/LoginForm';

// Types
import { RootState } from '../../../reducers/indexReducer';

// Styles
import './LoginPage.scss'; // We'll create this file next

const LoginPage = () => {
    const isLogged = useSelector((state: RootState) => state.login.isLogged);
    const location = useLocation();

    if (isLogged) {
        // If logged in, redirect. 
        // location.state?.from?.pathname allows redirecting to the page the user originally tried to access.
        // Defaults to /admin if no specific page was targeted.
        const from = location.state?.from?.pathname || '/admin';
        return <Navigate to={from} replace />;
    }

    return (
        <div className="LoginPage">
            <LoginForm />
        </div>
    );
};

export default LoginPage; 