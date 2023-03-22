import { ChangeEvent, FormEvent, useState } from "react";
import {useContextHook} from '../hooks/authContext';
import { useUserCredentialsStore } from "../store/userCredentialsStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface UserLog{
    email:string,
    password:string,
}

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
        <div>
            <form onSubmit={handleLog} className="card card-compact w-96 bg-base-100 shadow-xl">
                <label htmlFor="email">Email</label> 
                <input type="email" name="email" placeholder="youremail@company.com" onChange={handleOnChange} className="input input-bordered input-secondary w-full max-w-xs"/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="********" required className="input input-bordered input-secondary w-full max-w-xs" onChange={handleOnChange} />

                <div>
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </div>
            </form>
        </div>
    )
}

export default Logging;