import { ChangeEvent, FormEvent, useState } from "react";
import {useContextHook} from '../hooks/authContext';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface UserLog{
    email:string,
    password:string,
}

function Logging(){

    const navigate = useNavigate();

    const [userToLog,setUserToLog] =  useState<UserLog>({
        email:"",
        password:"",
    });

    const {logging} = useContextHook();
    
    const handleOnChange = ({target:{name,value}}: ChangeEvent<HTMLInputElement>) => {
        console.log(name,value)
        setUserToLog({...userToLog,[name]:value})
    }

    const handleLog = async (event: FormEvent) => {
        event.preventDefault();
        try{
            await logging(userToLog.email,userToLog.password);
            navigate("/");
            toast.success("Logged succefuly")
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