import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthAction, AuthActionType, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/Config";
import jwtDecode from "jwt-decode";

class AuthService {

    // Register:
    public async register(user: UserModel): Promise<void> {

        // Send user object to backend, get back token:
        const response = await axios.post<string>(`${appConfig.authUrl}/register`, user);

        // Extract token: 
        const token = response.data;

        // Save token in redux global state: 
        const action: AuthAction = { type: AuthActionType.Register, payload: token };
        authStore.dispatch(action);
    }

    // Login:
    public async login(credentials: CredentialsModel): Promise<void> {

        // Send credentials to backend:
        const response = await axios.post<string>(`${appConfig.authUrl}/login`, credentials);

        // Extract token:
        const token = response.data;

        // Save token in redux global state: 
        const action: AuthAction = { type: AuthActionType.Register, payload: token };
        authStore.dispatch(action);
    }

    // Logout:
    public logout(): void {
        // Logout in redux global state:
        const action: AuthAction = { type: AuthActionType.Logout };
        authStore.dispatch(action);
    }

    public async usernameExists(username: string): Promise<boolean> {
        // Check if username exists
        const response = await axios.get<boolean>(`${appConfig.authUrl}/` + username);
        return response.data;
    }

    // Check if user has admin privileges
    public isAdmin(user: UserModel = null): boolean {
        if (!user) {
            user = authStore.getState().user;
            if (!user) return false;
        }
        return user.roleId === 1;
    }

    // Check if a valid token exists;
    public isLoggedIn(): boolean {
        if (authStore.getState().token === null) return false;
        const container: { exp: number } = jwtDecode(authStore.getState().token);
        const now = new Date();
        //token.exp is in seconds, while Date.getTime is in milliseconds
        return container.exp * 1000 > now.getTime();
    }

}

// // AuthService.ts
// async function resetPassword() {
//     // Send credentials to backend:
//     const response = await axios.post<string>(`${appConfig.authUrl}/login`, credentials);

    // Extract token:
//     const token = response.data;

//     // Save token in redux global state: 
//     const action: AuthAction = { type: AuthActionType.Register, payload: token };
//     authStore.dispatch(action);
// }
    // Implement the API call to send a password reset email
    // Example: await httpService.post("/auth/reset-password", { email });
// }


const authService = new AuthService();

export default authService;