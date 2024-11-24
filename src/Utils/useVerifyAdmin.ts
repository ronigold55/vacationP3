import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../Services/AuthService";
import notifyService from "../Services/NotifyService";

export default function useVerifyAdmin() {

    const navigate = useNavigate();

    useEffect(() => {
        if(!authService.isLoggedIn) {
            navigate("/login");
        }

        if (!authService.isAdmin()) {
            navigate("/");
            notifyService.error("Access denied");
        }
    }, []);
}