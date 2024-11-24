import RoleModel from "./RoleModel";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public email: string;
    public phoneNumber: number;
    public password: string;
    public roleId: RoleModel;

}

export default UserModel;