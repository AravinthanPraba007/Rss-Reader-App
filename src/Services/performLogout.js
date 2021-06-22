import { useHistory, useLocation } from 'react-router-dom';

export const logout = (history, setUserAuthenticated) => {
    localStorage.removeItem('token');
    history.push("/");
    setUserAuthenticated(false);
}
