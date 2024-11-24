import axios from "axios";
import FollowerModel from "../Models/FollowerModel";
import VacationModel from "../Models/VacationModel";
import { VacationAction, VacationActionType, vacationStore } from "../Redux/VacationStates";
import appConfig from "../Utils/Config";
import notifyService from "./NotifyService";

class VacationService {

    // Get all vacations from backend:
    public async getAllVacations(): Promise<VacationModel[]> {

        // Take vacations resides in redux global state:
        let vacations = vacationStore.getState().vacations;

        // If we have no vacations in global state - fetch them from server:
        if (vacations.length === 0) {

            // Fetch all vacations from backend:
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);

            // Extract vacations from axios response:
            vacations = response.data;

            // Save fetched vacations in global state:
            const action: VacationAction = { type: VacationActionType.FetchVacations, payload: vacations };
            vacationStore.dispatch(action); // Redux will call vacationsReducer to perform this action.

        }

        // Return vacations:
        return vacations;
    }

    //Get one vacation by vacationId:
    public async getOneVacation(vacationId: number): Promise<VacationModel> {

        let vacation;

        // Take vacations resides in redux global state:
        let vacations = vacationStore.getState().vacations;

        // If we have no vacations in global state - fetch them from server:
        if (vacations.length === 0) {
            
            // Fetch all vacations from backend:
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationId);
            
            // Extract vacations from axios response:
            vacation = response.data;
           

        } else {
            vacation = vacations.find(v => v.vacationId === vacationId);
        }

        // Return vacation:
        return vacation;
    }

    //Filter vacations:
    public async getMyVacations(): Promise<VacationModel[]> {

        //get all the vacations
        let vacations = await this.getAllVacations()

        //Filter only the vacations if the user follows them
        vacations = vacations.filter(el => el.isFollowed);

        // Return vacations:
        return vacations;
    }

    //Add follower
    public async AddFollow(vacationId: number): Promise<void> {

        // Send follower to backend:
        await axios.post<FollowerModel>(`${appConfig.vacationsUrl}${vacationId}/follow`);
        // Send added follower to redux global state:
        const action: VacationAction = { type: VacationActionType.Follow, payload: vacationId };
        vacationStore.dispatch(action);

    }

    //Delete follower
    public async deleteFollow(vacationId: number): Promise<void> {

        // Delete this follower in backend: 
        await axios.delete<FollowerModel>(`${appConfig.vacationsUrl}${vacationId}/unfollow`);
        // Delete this follower also in redux global state:
        const action: VacationAction = { type: VacationActionType.UnFollow, payload: vacationId };
        vacationStore.dispatch(action);

    }

    //Update vacation
    public async updateVacation(vacation: VacationModel): Promise<void> {

        // Convert VacationModel into FormData because we need to send text + image:
        const formData = new FormData();
        formData.append("vacationId", vacation.vacationId.toString());
        formData.append("followersCount", vacation.followersCount.toString());
        formData.append("isFollowed", vacation.isFollowed.toString());
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("arrivalDate", vacation.arrivalDate);
        formData.append("departureDate", vacation.departureDate);
        formData.append("price", vacation.price.toString());
        formData.append("image", vacation.image[0]);
        formData.append("imageName", vacation.imageName);

        // Send vacation to backend: 
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, formData);

        const updatedVacation: VacationModel = response.data;

        // Send updated vacation to redux global state:
        const action: VacationAction = { type: VacationActionType.UpdateVacation, payload: updatedVacation };
        vacationStore.dispatch(action);

    }

    //Add vacation
    public async addVacation(vacation: VacationModel): Promise<void> {

        // Convert VacationModel into FormData because we need to send text + image:
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("description", vacation.description);
        formData.append("image", vacation.image[0]);
        formData.append("arrivalDate", vacation.arrivalDate);
        formData.append("departureDate", vacation.departureDate);
        formData.append("price", vacation.price.toString());

        // Send vacation to backend: 
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, formData);

        const addedVacation: VacationModel = response.data;

        // Send added vacation to redux global state: 
        const action: VacationAction = { type: VacationActionType.AddVacation, payload: addedVacation };
        vacationStore.dispatch(action);

    }

    //Delete vacation
    public async deleteVacation(vacationId: number): Promise<void> {

        // Delete this vacation in backend: 
        await axios.delete<VacationModel>(appConfig.vacationsUrl + vacationId);

        // Delete this vacation also in redux global state: 
        const action: VacationAction = { type: VacationActionType.DeleteVacation, payload: vacationId };
        vacationStore.dispatch(action);

    }

    //Reset vacations
    public resetVacations() {
        // Reset all vacations in redux global state: 
        const action: VacationAction = { type: VacationActionType.ResetVacations, payload: '' };
        vacationStore.dispatch(action);
    }

}

const vacationService = new VacationService();

export default vacationService;