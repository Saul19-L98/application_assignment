import { useContextHook} from "../hooks/authContext";
import { useApplications, useEmployees } from '../hooks/queryHook';
import { useUserCredentialsStore } from "../store/userCredentialsStore";
import ModalForm from "../components/ModalForm";
import Spinner from "../components/Spinner";
import Table from "../components/Table";

function DashBoard(){
    const {setUserCredentials,setEmployees,setApplications,userData, employees} = useUserCredentialsStore();
    const {logOut} = useContextHook();

    // Get Employee's name
    const getEmployeeName = (employeeId: string) => {
        const employee = employees?.find((e) => e.employeeId === employeeId);
        return employee ? employee.fullName : "Unknown";
    };

     // Use the useApplications hook
    const { isLoading: isApplicationsLoading, isError: isApplicationsError, refetch: refetchApplications, } = useApplications();

    // Use the useEmployees hook
    const { data: employeesData, isLoading: isEmployeesLoading, isError: isEmployeesError, error: employeesError } = useEmployees();

    //Get first letter of the employee name
    const getFirstLetterOfEmployeeName = () => {
        const employeeName = getEmployeeName(userData!.employeeId);
        return employeeName.charAt(0).toUpperCase();
    };

    const handleLogOut = async () => {
        await logOut();
        setUserCredentials(null);
        setEmployees(null);
        setApplications(null);
    }


    if (isApplicationsLoading && isEmployeesLoading) {
        return <Spinner />;
    }
    
    if (isApplicationsError && isEmployeesError) {
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
                                <h1>{getEmployeeName(userData!.employeeId)}</h1>
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

export default DashBoard;