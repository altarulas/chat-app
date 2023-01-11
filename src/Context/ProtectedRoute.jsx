import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "./Auth";
import { useContext } from "react";

const ProtectedRoute = () => {
    const { currentUser } = useContext(AuthContext);
    const useAuth = () => {
        const checkUser = { loggedIn: currentUser };
        return checkUser && checkUser.loggedIn;
    };
    const isAuth = useAuth();

    return isAuth ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoute;