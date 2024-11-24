import { Navigate, Route, Routes } from "react-router-dom";
import AddVacation from "../../AdminArea/AddVacation/AddVacation";
import EditVacation from "../../AdminArea/EditVacation/EditVacation";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import VacationList from "../../VacationArea/VacationList/VacationList";
import PageNotFound from "../PageNotFound/PageNotFound";
import FollowersChart from "../../AdminArea/Charts/FollowersChart";
import ExportCsv from "../../AdminArea/Csv/ExportCsv";
// import ExportToCSV from "../../AdminArea/Csv/ExportToCSV";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/off-logout" element={<Logout off={true} />} />
                <Route path="/logout" element={<Logout off={false} />} />
                <Route path="/vacations" element={<VacationList/>} />
                <Route path="/vacations/new" element={<AddVacation/>} />
                <Route path="/vacations/edit/:vacationId" element={<EditVacation/>} />
                <Route path="/vacations/charts" element={<FollowersChart/>} />
                <Route path="/vacations/csv" element={<ExportCsv/>} />
                <Route path="/" element={<Navigate to="/vacations" />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
