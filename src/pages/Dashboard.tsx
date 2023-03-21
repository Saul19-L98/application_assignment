import {useEffect} from "react";
import { db } from "../firebase.config";
import {collection,getDocs,DocumentData} from 'firebase/firestore';
import { useContextHook} from "../hooks/authContext";
import { useApplications } from '../hooks/queryHook';
import { useUserCredentialsStore } from "../store/userCredentialsStore";
import ModalForm from "../components/ModalForm";
import Spinner from "../components/Spinner";

interface EmployeesData{
    employeeId:string;
    fullName:string;
    position:string;
    initialDate:string;
}

function DashBoard(){
    const {setUserCredentials,setEmployees} = useUserCredentialsStore();
    const {logOut} = useContextHook();

    const { isLoading, isError } = useApplications();
    const { applications,employees } = useUserCredentialsStore();

    const fetchEmployees = async () => {
        const employeesRef = collection(db, 'employees');
        const employeesDocs = await getDocs(employeesRef);
        const employeesData: DocumentData[] = [];
        employeesDocs.forEach((doc) => {
            employeesData.push({ ...doc.data(), employeeId: doc.id });
        });
        setEmployees(employeesData as EmployeesData[]);
    };

    const getEmployeeName = (employeeId: string) => {
        const employee = employees?.find((e) => e.employeeId === employeeId);
        return employee ? employee.fullName : "Unknown";
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleLogOut = async () => {
        await logOut();
        setUserCredentials(null);
    }


    if (isLoading) {
        return <Spinner />;
    }
    
    if (isError) {
    return <Spinner />;
    }

    return(
        <div>
            <h1>Hello from DashBoard (HR Specialist)</h1>
            <div>
                <button className="btn btn-primary" onClick={handleLogOut}>
                    Sign Out
                </button>
                <label htmlFor="my-modal" className="btn btn-primary">Create Application</label>
                <input type="checkbox" id="my-modal" className="modal-toggle" />
                <div className="modal">
                    <ModalForm />
                </div>
            </div>
            <div>
                {/* Render your applications data */}
                {applications?.map((application) => (
                    <div key={application.applicationId}>
                        {/* {Show the neames of the users} */}
                        {getEmployeeName(application.employeeId)}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DashBoard;