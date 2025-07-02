import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RefreshUser = ({ isLoggin }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isLoggin && (location.pathname === "/login" || location.pathname === "/signup")) {
            navigate("/allblogs"); // Redirect directly instead of to `/`
        }
    }, [isLoggin, location.pathname]);


    return null;
}

export default RefreshUser;
