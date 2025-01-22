
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated  = localStorage.getItem('isAuthenticated');
    console.log("isAuthenticated",isAuthenticated)
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;