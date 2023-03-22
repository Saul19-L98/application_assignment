import { UserLog } from "../interfaces/sessionTypes"
import { ChangeEvent, FormEvent, useState } from "react";
import {useContextHook} from '../hooks/authContext';
import { useUserCredentialsStore } from "../store/userCredentialsStore";
import { toast } from "react-toastify";
import { useNavigate,Link } from "react-router-dom";

function Logging(){

    const { setUserCredentials,setUserData } = useUserCredentialsStore();
    const navigate = useNavigate();

    const [userToLog,setUserToLog] =  useState<UserLog>({
        email:"",
        password:"",
    });

    const {logging,getUserRole } = useContextHook();
    
    const handleOnChange = ({target:{name,value}}: ChangeEvent<HTMLInputElement>) => {
        console.log(name,value)
        setUserToLog({...userToLog,[name]:value})
    }

    const handleLog = async (event: FormEvent) => {
        event.preventDefault();
        try{
            const userLogIn = await logging(userToLog.email,userToLog.password);
            if(userLogIn){
                setUserCredentials(userLogIn);   
                const userObject = await getUserRole(userLogIn.user.uid);
                setUserData(userObject)
                if (userObject?.rol === "employee") {
                    navigate("/");
                } else if (userObject?.rol === "hrSpecialist") {
                    navigate("/dashboard");
                } else {
                    throw new Error("Unknown user role");
                }
                toast.success("Logged succefuly")
            }
        }
        catch(error){
            const errorMessage = (error as Error).message;
            toast.error(`${errorMessage}`)
            throw new Error(`Something went wrong: ${errorMessage}`)
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleLog} className="card card-compact w-96 bg-base-100 shadow-xl">
                <div className="flex flex-col items-center">
                    <h1 className="text-center w-full">Application Assignment</h1>
                    <div className="flex flex-col w-full px-4 mt-4">
                        <label htmlFor="email" className="text-left">Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="youremail@company.com"
                            onChange={handleOnChange}
                            className="input input-bordered input-secondary w-full"
                        />
                    </div>

                    <div className="flex flex-col w-full px-4 mt-4">
                        <label htmlFor="password" className="text-left">Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="********"
                            required
                            className="input input-bordered input-secondary w-full"
                            onChange={handleOnChange}
                        />
                    </div>
                    <Link to="/sign-up" className="text-sm text-blue-600 hover:text-yellow-500 mt-2">
                        Create Account.
                    </Link>

                    <div className="w-full px-4">
                    <button type="submit" className="btn btn-primary w-full mt-4">
                        Sign In
                    </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Logging;