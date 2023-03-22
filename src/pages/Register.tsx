import { ChangeEvent, FormEvent, useState } from "react";
import {useContextHook} from '../hooks/authContext';
import { db } from "../firebase.config";
import {doc,setDoc} from 'firebase/firestore';
import { v4 as uuidv4 } from "uuid";
import {useUserCredentialsStore} from '../store/userCredentialsStore'
import { toast } from "react-toastify";
import { useNavigate,Link } from "react-router-dom";

interface UserRegister{
    email:string,
    password:string,
    rol: string,
    fullName: string,
    position:string,
    initialDate: string,
}

function Register(){

    const navigate = useNavigate();
    const { setUserCredentials,setUserData } = useUserCredentialsStore();

    const [userToRegister,setUserToRegister] =  useState<UserRegister>({
        email:"",
        password:"",
        rol:"",
        fullName:"",
        position:"",
        initialDate:""
    });

    const {signIn,getUserRole} = useContextHook();
    
    const handleOnChange = ({target:{name,value}}: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        console.log(name,value)
        setUserToRegister({...userToRegister,[name]:value})
    }

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();
        try{
            const infoUser = await signIn(userToRegister.email,userToRegister.password);
            if(infoUser){
                setUserCredentials(infoUser);
            }
            const idgenerated = uuidv4();
            const docRefUser = doc(db,`users/${infoUser.user.uid}`);
            const docRefEmployee = doc(db,`employees/${idgenerated}`);
            if(docRefUser && docRefEmployee){
                await setDoc(docRefUser,{rol:userToRegister.rol,employeeId:idgenerated});
                await setDoc(docRefEmployee,{fullName:userToRegister.fullName,position:userToRegister.position,initialDate:userToRegister.initialDate});
            }
            else {
                throw new Error("docRef creation failed");
            }
            const userObject = await getUserRole(infoUser.user.uid);
            setUserData(userObject);
            if (userObject?.rol === "employee") {
                navigate("/");
            } else if (userObject?.rol === "hrSpecialist") {
                navigate("/dashboard");
            } else {
                throw new Error("Unknown user role");
            }
            toast.success("User created succefuly")
        }
        catch(error){
            const errorMessage = (error as Error).message;
            toast.error(`${errorMessage}`)
            throw new Error(`Something went wrong: ${errorMessage}`)
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleRegister} className="card card-compact w-96 bg-base-100 shadow-xl flex flex-col">
                <h1 className="text-center w-full">Create Account</h1>
                <div className="flex flex-col w-full px-4 mt-4">
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email" className="ml-4">Email</label> 
                        <input type="email" name="email" placeholder="youremail@company.com" onChange={handleOnChange} className="input input-bordered input-secondary w-full max-w-xs self-center"/>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="password" className="ml-4">Password</label>
                        <input type="password" name="password" placeholder="********" required className="input input-bordered input-secondary w-full max-w-xs self-center" onChange={handleOnChange} />
                    </div>

                    <div className="flex flex-col mb-4">
                        <select defaultValue={"DEFAULT"} name="rol" className="select select-info w-full max-w-xs self-center" onChange={handleOnChange}>
                            <option value="DEFAULT" disabled>Select Rol</option>
                            <option value="employee">Employee</option>
                            <option value="hrSpecialist">HR Specialist</option>
                        </select>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="name" className="ml-4">Full Name</label> 
                        <input type="text" name="fullName" placeholder="Jhon Williams" onChange={handleOnChange} className="input input-bordered input-secondary w-full max-w-xs self-center"/>
                    </div>

                    <div className="flex flex-col mb-4">
                        <select defaultValue={"DEFAULT"} name="position" className="select select-info w-full max-w-xs self-center" onChange={handleOnChange}>
                            <option value="DEFAULT" disabled>Select Position</option>
                            <option value="uiDesigner">UI Designer</option>
                            <option value="qaEngineering">QA Engineering</option>
                            <option value="webDeveloper">Web Developer</option>
                            <option value="analyst">Data Analyst</option>
                        </select>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="initialDate" className="ml-4">Initial Job Assigment Date</label> 
                        <input type="date" name="initialDate" onChange={handleOnChange} className="input input-bordered input-secondary w-full max-w-xs self-center"/>
                    </div>

                    <Link to="/sign-in" className="text-sm text-blue-600 hover:text-yellow-500 mb-4 text-center">
                        Already have one.
                    </Link>

                    <div className="self-center mb-4">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register;