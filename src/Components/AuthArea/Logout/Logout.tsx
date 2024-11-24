import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";

interface LogoutProps {
    off: boolean;
}

function Logout(props: LogoutProps): JSX.Element {

    const navigate = useNavigate();

    useEffect( () => {
        try{
            authService.logout();
            vacationService.resetVacations();
            if(!props.off) notifyService.success("Bye bye");
            navigate("/login")
        }
        catch(err:any) {
            notifyService.error(err);
        }
    } ,[])
    
    return null;
}

export default Logout;
