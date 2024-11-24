import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddIcon from '@mui/icons-material/Add';
import { Archive } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Pagination from '@mui/material/Pagination';
import "./VacationList.css";

function VacationList(): JSX.Element {

    const navigate = useNavigate();
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [filterMyVacations, setFilterMyVacations] = useState<VacationModel[]>([]);
    const totalItemsPerPage = 8;
    const [page, setPage] = useState<number>(1);
    const [numOfPage, setNumOfPage] = useState<number>();
    const [checked, setChecked] = useState<boolean>(false);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    useEffect(() => {
        if (!authService.isLoggedIn()) {
            navigate("/off-logout");
            return;
        } else {
            vacationService.getAllVacations()
                .then(vacations => setVacations(vacations))
                .catch(err => notifyService.error(err));

            setNumOfPage(Math.ceil(vacations.length / totalItemsPerPage))
            if (checked) { setNumOfPage(Math.ceil(filterMyVacations.length / totalItemsPerPage)) }
        }

    }, [vacations, checked])


    async function filterVacations(event: any) {
        if (event.target.checked) {
            vacationService.getMyVacations()
                .then(filterMyVacations => {
                    setFilterMyVacations(filterMyVacations)
                    setChecked(true)
                })
                .catch(err => notifyService.error(err));
        } else {
            vacationService.getAllVacations()
                .then(vacations => {
                    setVacations(vacations)
                    setChecked(false)
                })
                .catch(err => notifyService.error(err));
        }
    }


    return (
        <div className="VacationList">
            <h1>Our holidays offers for  your vacations </h1>

            <div className="AdminOptionsDiv">
            {authService.isAdmin() && <>
                <NavLink to="/vacations/new"><AddIcon />Add Vacation</NavLink>
                <NavLink to="/vacations/charts"><AssessmentIcon fontSize="medium" />Reports</NavLink>
                <NavLink to="/vacations/csv"><Archive fontSize="medium" />csv.file</NavLink>
            </>}
            </div>

            {/* {!authService.isAdmin() && <>
                <Checkbox {...label} icon={<FavoriteBorder />} color:white checkedIcon={<Favorite />} checked={checked} onChange={filterVacations} className="CheckBoxFilter" />
                <p className="MyVacations">My Vacations</p>
            </>} */}
            {!authService.isAdmin() && (
    <>
        <Checkbox 
            {...label} 
            icon={<FavoriteBorder />} 
            color="success" 
            checkedIcon={<Favorite />} 
            checked={checked} 
            onChange={filterVacations} 
            className="CheckBoxFilter" 
        />
        <p className="MyVacations">My Vacations</p>
    </>
)}

            
            {checked && filterMyVacations.slice((page - 1) * totalItemsPerPage, page * totalItemsPerPage).map(v => { return (<VacationCard key={v.vacationId} vacation={v} />) })}
            {!checked && vacations.slice((page - 1) * totalItemsPerPage, page * totalItemsPerPage).map(vac => { return (<VacationCard  key={vac.vacationId} vacation={vac} />) })}
       
            <Pagination count={numOfPage} page={page} onChange={handleChange} defaultPage={1} color="secondary" size="large" />
            
        </div>
    );
}

export default VacationList;
