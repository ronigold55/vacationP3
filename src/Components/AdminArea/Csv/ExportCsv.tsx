
import { NavLink } from 'react-router-dom';
import vacationService from '../../../Services/VacationService';
import notifyService from '../../../Services/NotifyService';
import { useEffect, useState } from 'react';
import useVerifyAdmin from '../../../Utils/useVerifyAdmin';
import "./ExportCsv.css";

 function ExportCsv(): JSX.Element {
    useVerifyAdmin();

    const [vacationData, setVacationData] = useState<any[]>([]);

    useEffect(() => {
        vacationService.getAllVacations()
            .then(vacations => {
                const followers = vacations.filter(v => v.followersCount > 0);
                setVacationData(followers);
            })
            .catch(err => notifyService.error(err));
    }, []);

    const ExportToCsv = () => {
        if (!vacationData || vacationData.length === 0) {
            notifyService.error("No data available for export.");
            return;
        }

        // CSV header and rows
        const headers = ["Destination", "Followers Count"];
        const rows = vacationData.map(v => [v.destination, v.followersCount]);

        // Convert to CSV format
        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers, ...rows].map(row => row.join(",")).join("\n");

        // Create a download link and trigger it
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "vacation_followers.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="ExportCsv">
            <h2>Export Vacation Data</h2>
            <button onClick={ExportToCsv}>Export to CSV</button>
            <br/><br/>
            <NavLink to="/vacations">-Back-</NavLink>
        </div>
    );
}


export default ExportCsv