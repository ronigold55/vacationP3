import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

//1. State - This is the data:
export class VacationState {
    public vacations: VacationModel[] = [];  // Our global data.
}

//2. enum Action Type - List of actions we can do on the above state
export enum VacationActionType {
    FetchVacations = "FetchVacations", // Fetch all vacations from backend
    AddVacation = "AddVacation", // Add new vacation
    UpdateVacation = "UpdateVacation", // Update existing vacation
    DeleteVacation = "DeleteVacation", // Delete existing vacation
    Follow = "FollowVacation", // Add new follower
    UnFollow = "UnFollowVacation", // Delete existing follower
    ResetVacations = "ResetVacations" //Reset all the vacations
}

//3. interface Actin - Object for describing a single operation on the state:  
export interface VacationAction {
    type: VacationActionType, // Which operation we're going to do
    payload: any; // Which data we're sending
}

//4. Reducer function - function which performs the needed operation:
export function vacationReducer(currentState = new VacationState(), action: VacationAction): VacationState {

    const newState = { ...currentState }; // We must duplicate the original object
    // Do the change on the newState: 
    switch (action.type) {

        case VacationActionType.FetchVacations: // Here payload must be all vacations fetched from the server
            newState.vacations = action.payload; // Set all fetched vacations to the state
            break;

        case VacationActionType.AddVacation: // Here payload must be the vacation to add
            newState.vacations.push(action.payload) // Add the new vacation to the state
            newState.vacations.sort((a, b) => {
                let aDate = new Date(a.arrivalDate);
                let bDate = new Date(b.arrivalDate);
                return aDate > bDate  ? 1 : -1});
            break;

        case VacationActionType.UpdateVacation:  // Here payload must be the vacation to update          
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId); // -1 if not exist
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;  // Update
            }
            break;

        case VacationActionType.DeleteVacation: // Here payload must be id to delete
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload); // -1 if not exist
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1); //Delete
            }
            break;

        case VacationActionType.Follow: // Here payload must be the follower to add
            const fIndexToUpdate = newState.vacations.findIndex(f => f.vacationId === action.payload); // -1 if not exist
            if (fIndexToUpdate >= 0) {
                newState.vacations[fIndexToUpdate].followersCount++;
                newState.vacations[fIndexToUpdate].isFollowed = true;
            }
            break;
            
        case VacationActionType.UnFollow: // Here payload must be id to delete
            const fIndexToDelete = newState.vacations.findIndex(f => f.vacationId === action.payload); // -1 if not exist
            if (fIndexToDelete >= 0) {
                newState.vacations[fIndexToDelete].followersCount--;
                newState.vacations[fIndexToDelete].isFollowed = false;
            }
            break;
        
        case VacationActionType.ResetVacations: 
            newState.vacations=[];
            break;
    }

    return newState; // return the new state
}

//5. Store  redux object for managing the global state:
export const vacationStore = createStore(vacationReducer);