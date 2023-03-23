import { useContextHook} from "../hooks/authContext";
import { useApplicationByEmployee,useEmployee } from '../hooks/queryHook';
import { useUserCredentialsStore } from "../store/userCredentialsStore";
import {getEmployeeName} from "../helpers/getUserName"
import ModalForm from "../components/ModalForm";
import Spinner from "../components/Spinner";
import Table from "../components/Table";

function Home(){
    const {setUserCredentials,setEmployees,setApplications,userData,employees} = useUserCredentialsStore();
    const {logOut} = useContextHook();

    const { isLoading: isApplicationsLoading, isError: isApplicationsError, refetch: refetchApplications } = useApplicationByEmployee(userData!.employeeId);

    const { data: employeeData, isLoading: isEmployeeLoading, isError: isEmployeeError, error: employeeError } = useEmployee(userData!.employeeId);

    //Get first letter of the employee name
    const getFirstLetterOfEmployeeName = () => {
        const employeeName = getEmployeeName(userData!.employeeId,employees!);
        return employeeName.charAt(0).toUpperCase();
    };

    const handleLogOut = async () => {
        await logOut();
        setUserCredentials(null);
        setEmployees(null);
        setApplications(null);
    }


    if (isApplicationsLoading && isEmployeeLoading) {
        return <Spinner />;
    }
    
    if (isApplicationsError && isEmployeeError) {
    return <Spinner />;
    }

    return(
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="card w-full bg-base-100 shadow-xl m-4 md:w-72">
                    <div className="flex justify-center p-4">
                        <div className="avatar online placeholder">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-20">
                                <span className="text-xl">{getFirstLetterOfEmployeeName()}</span>
                            </div>
                        </div>
                        <div className="flex flex-col ml-2">
                            <div>
                                <h1>{getEmployeeName(userData!.employeeId,employees!)}</h1>
                            </div>
                            <div>
                                <button className="btn btn-primary mt-2 sm:mt-0" onClick={handleLogOut}>
                                    Sign Out
                                </button>
                            </div>
                        </div> 
                    </div>
                </div>
                <div className="mb-4 sm:mb-0 sm:mr-4">
                    <label htmlFor="my-modal" className="btn btn-primary">Create Application</label>
                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <ModalForm refetchApplications={refetchApplications} />
                    </div>
                </div>
            </div>
            <div>
                <Table />
            </div>
        </div>
    )
}

export default Home;