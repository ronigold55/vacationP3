// import { Button, TextField } from "@mui/material";
// import LoginIcon from '@mui/icons-material/Login';
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import UserModel from "../../../Models/UserModel";
// import authService from "../../../Services/AuthService";
// import notifyService from "../../../Services/NotifyService";
// import "./Register.css";

// function Register(): JSX.Element {

//     const { register, handleSubmit, formState } = useForm<UserModel>();
//     const navigate = useNavigate();

//     const [usernameExists, setUsernameExists] = useState<boolean>();

//     async function send(user: UserModel) {
//         try {
//             const exists = await authService.usernameExists(user.username);
//             if (exists) {
//                 setUsernameExists(true);
//                 return;
//             }
//             await authService.register(user);
//             notifyService.success(`Welcome ${user.username}!`);
//             navigate("/vacations");
//         }
//         catch (err: any) {
//             notifyService.error(err);
//             alert("please complete this form");
//         }
//     }

//     return (
//         <div className="Register">

//             <form onSubmit={handleSubmit(send)}>

//                 <h2>Register</h2>

//                 <TextField label="First Name" type="text" variant="outlined" className="TextBox" {...register("firstName", {
//                     required: { value: true, message: "Missing first name!" },
//                     minLength: { value: 2, message: "First name must be minimum 2 chars" },
//                     maxLength: { value: 100, message: "First name can't exceed 100 chars" }
//                 })} />
//                 <span className="SpanMessage">{formState.errors.firstName?.message}</span>

//                 <TextField label="Last Name" type="text" variant="outlined" className="TextBox" {...register("lastName", {
//                     required: { value: true, message: "Missing last name!" },
//                     minLength: { value: 2, message: "Last name must be minimum 2 chars" },
//                     maxLength: { value: 100, message: "Last name can't exceed 100 chars" }
//                 })} />
//                 <span className="SpanMessage">{formState.errors.lastName?.message}</span>

//                 <TextField label="Email" type="email" variant="outlined" className="TextBox" {...register("email", {
//                     required: { value: true, message: "Missing email" },
//                     minLength: { value: 2, message: "Email must be minimum 2 chars" },
//                     maxLength: { value: 100, message: "Email can't exceed 100 chars" }
//                 })} />
//                 <span className="SpanMessage">{formState.errors.email?.message}</span>

//                 <TextField label="phoneNumber" type="phone" variant="outlined" className="TextBox" {...register("phoneNumber", {
//                     required: { value: true, message: "Missing phoneNumber" },
//                     minLength: { value: 2, message: "Email must be minimum 9 chars" },
//                     maxLength: { value: 100, message: "Email can't exceed 20 chars" }
//                 })} />
//                 <span className="SpanMessage">{formState.errors.phoneNumber?.message}</span>



//                 <TextField label="Username" type="text" variant="outlined" className="TextBox" {...register("username", {
//                     required: { value: true, message: "Missing username!" },
//                     minLength: { value: 4, message: "Username must be minimum 4 chars" },
//                     maxLength: { value: 100, message: "Username can't exceed 100 chars" }
//                 })} />
//                 <span className="SpanMessage">{formState.errors.username?.message}</span>
//                 {usernameExists && <span className="SpanUsernameMessage">Username is taken</span>}

//                 <TextField label="Password" type="password" variant="outlined" className="TextBox" {...register("password", {
//                     required: { value: true, message: "Missing password!" },
//                     minLength: { value: 4, message: "Password  must be minimum 4 chars" },
//                     maxLength: { value: 128, message: "Password can't exceed 128 chars" }
//                 })} />
//                 <span className="SpanMessage">{formState.errors.password?.message}</span>

//                 <Button type="submit" className="Btn" startIcon={<LoginIcon fontSize="medium" />}>Register</Button>

//             </form>

//         </div>
//     );
// }

// export default Register;

// // import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
// // import LoginIcon from "@mui/icons-material/Login";
// // import Visibility from "@mui/icons-material/Visibility";
// // import VisibilityOff from "@mui/icons-material/VisibilityOff";
// // import { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { useNavigate } from "react-router-dom";
// // import UserModel from "../../../Models/UserModel";
// // import authService from "../../../Services/AuthService";
// // import notifyService from "../../../Services/NotifyService";
// // import "./Register.css";

// // function Register(): JSX.Element {
// //     const { register, handleSubmit, formState } = useForm<UserModel>();
// //     const navigate = useNavigate();

// //     const [usernameExists, setUsernameExists] = useState<boolean>();
// //     const [showPassword, setShowPassword] = useState(false);

// //     const handleClickShowPassword = () => setShowPassword(!showPassword);

// //     async function send(user: UserModel) {
// //         try {
// //             const exists = await authService.usernameExists(user.username);
// //             if (exists) {
// //                 setUsernameExists(true);
// //                 return;
// //             }
// //             await authService.register(user);
// //             notifyService.success(`Welcome ${user.username}!`);
// //             navigate("/vacations");
// //         } catch (err: any) {
// //             notifyService.error(err);
// //         }
// //     }

// //     return (
// //         <div className="Register">
// //             <form onSubmit={handleSubmit(send)}>

// //                 <h2>Register</h2>

// //                 <TextField label="First Name" type="text" variant="outlined" className="TextBox" {...register("firstName", {
// //                     required: { value: true, message: "Missing first name!" },
// //                     minLength: { value: 2, message: "First name must be minimum 2 chars" },
// //                     maxLength: { value: 100, message: "First name can't exceed 100 chars" }
// //                 })} />
// //                 <span className="SpanMessage">{formState.errors.firstName?.message}</span>

// //                 <TextField label="Last Name" type="text" variant="outlined" className="TextBox" {...register("lastName", {
// //                     required: { value: true, message: "Missing last name!" },
// //                     minLength: { value: 2, message: "Last name must be minimum 2 chars" },
// //                     maxLength: { value: 100, message: "Last name can't exceed 100 chars" }
// //                 })} />
// //                 <span className="SpanMessage">{formState.errors.lastName?.message}</span>

// //                 <TextField label="Email" type="email" variant="outlined" className="TextBox" {...register("email", {
// //                     required: { value: true, message: "Missing email" },
// //                     minLength: { value: 2, message: "Email must be minimum 2 chars" },
// //                     maxLength: { value: 100, message: "Email can't exceed 100 chars" }
// //                 })} />
// //                 <span className="SpanMessage">{formState.errors.email?.message}</span>

// //                 <TextField label="Phone" type="phone" variant="outlined" className="TextBox" {...register("phoneNumber", {
// //                     required: { value: true, message: "Missing your phone number" },
// //                     minLength: { value: 9, message: "Phone must be minimum 2 chars" },
// //                     maxLength: { value: 10, message: "Phone can't exceed 100 chars" }
// //                 })} />
// //                 <span className="SpanMessage">{formState.errors.email?.message}</span>

// //                 <TextField label="Username" type="text" variant="outlined" className="TextBox" {...register("username", {
// //                     required: { value: true, message: "Missing username!" },
// //                     minLength: { value: 4, message: "Username must be minimum 4 chars" },
// //                     maxLength: { value: 100, message: "Username can't exceed 100 chars" }
// //                 })} onChange={() => setUsernameExists(false)} />
// //                 <span className="SpanMessage">{formState.errors.username?.message}</span>
// //                 {usernameExists && <span className="SpanUsernameMessage">Username is taken</span>}

// //                 <TextField
// //                     label="Password"
// //                     type={showPassword ? "text" : "password"}
// //                     variant="outlined"
// //                     className="TextBox"
// //                     {...register("password", {
// //                         required: { value: true, message: "Missing password!" },
// //                         minLength: { value: 4, message: "Password must be minimum 4 chars" },
// //                         maxLength: { value: 128, message: "Password can't exceed 128 chars" }
// //                     })}
// //                     InputProps={{
// //                         endAdornment: (
// //                             <InputAdornment position="end">
// //                                 <IconButton onClick={handleClickShowPassword} edge="end">
// //                                     {showPassword ? <VisibilityOff /> : <Visibility />}
// //                                 </IconButton>
// //                             </InputAdornment>
// //                         ),
// //                     }}
// //                 />
// //                 <span className="SpanMessage">{formState.errors.password?.message}</span>

// //                 <Button type="submit" className="Btn" startIcon={<LoginIcon fontSize="medium" />}>Register</Button>
// //             </form>
// //         </div>
// //     );
// // }

// // export default Register;

import { Button, TextField } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();
    const navigate = useNavigate();

    const [usernameExists, setUsernameExists] = useState<boolean>();

    async function send(user: UserModel) {
        try {
            const exists = await authService.usernameExists(user.username);
            if (exists) {
                setUsernameExists(true);
                return;
            }
            await authService.register(user);
            notifyService.success(`Welcome ${user.username}!`);
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">

            <form onSubmit={handleSubmit(send)}>

                <h2>Register</h2>

                <TextField label="First Name" type="text" variant="outlined" className="TextBox" {...register("firstName", {
                    required: { value: true, message: "Missing first name!" },
                    minLength: { value: 2, message: "First name must be minimum 2 chars" },
                    maxLength: { value: 100, message: "First name can't exceed 100 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.firstName?.message}</span>

                <TextField label="Last Name" type="text" variant="outlined" className="TextBox" {...register("lastName", {
                    required: { value: true, message: "Missing last name!" },
                    minLength: { value: 2, message: "Last name must be minimum 2 chars" },
                    maxLength: { value: 100, message: "Last name can't exceed 100 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.lastName?.message}</span>

                <TextField label="Username" type="text" variant="outlined" className="TextBox" {...register("username", {
                    required: { value: true, message: "Missing username!" },
                    minLength: { value: 4, message: "Username must be minimum 4 chars" },
                    maxLength: { value: 100, message: "Username can't exceed 100 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.username?.message}</span>
                {usernameExists && <span className="SpanUsernameMessage">Username is taken</span>}


                <TextField label="Email" type="email" variant="outlined" className="TextBox" {...register("email", {
                    required: { value: true, message: "Missing email" },
                    minLength: { value: 2, message: "Email must be minimum 2 chars" },
                    maxLength: { value: 100, message: "Email can't exceed 100 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.email?.message}</span>

                <TextField label="phoneNumber" type="phone" variant="outlined" className="TextBox" {...register("phoneNumber", {
                    required: { value: true, message: "Missing your phone number" },
                    minLength: { value: 9, message: "Phone must be minimum 9 chars" },
                    maxLength: { value: 20, message: "Phone can't exceed 20 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.phoneNumber?.message}</span>

                <TextField label="Password" type="password" variant="outlined" className="TextBox" {...register("password", {
                    required: { value: true, message: "Missing password!" },
                    minLength: { value: 4, message: "Password  must be minimum 4 chars" },
                    maxLength: { value: 128, message: "Password can't exceed 128 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.password?.message}</span>

                <Button type="submit" className="Btn" startIcon={<LoginIcon fontSize="medium" />}>Register</Button>

            </form>

        </div>
    );
}

export default Register;