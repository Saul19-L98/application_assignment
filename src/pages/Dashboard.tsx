import { useContextHook} from "../hooks/authContext";
import { useApplications, useEmployees } from '../hooks/queryHook';
import { useUserCredentialsStore } from "../store/userCredentialsStore";
import ModalForm from "../components/ModalForm";
import Spinner from "../components/Spinner";
import Table from "../components/Table";

function DashBoard(){
    const {setUserCredentials,userData, employees} = useUserCredentialsStore();
    const {logOut} = useContextHook();

    // Get Employee's name
    const getEmployeeName = (employeeId: string) => {
        const employee = employees?.find((e) => e.employeeId === employeeId);
        return employee ? employee.fullName : "Unknown";
    };

     // Use the useApplications hook
    const { data: applicationsData, isLoading: isApplicationsLoading, isError: isApplicationsError, error: applicationsError } = useApplications();

    // Use the useEmployees hook
    const { data: employeesData, isLoading: isEmployeesLoading, isError: isEmployeesError, error: employeesError } = useEmployees();


    const handleLogOut = async () => {
        await logOut();
        setUserCredentials(null);
    }


    if (isApplicationsLoading && isEmployeesLoading) {
        return <Spinner />;
    }
    
    if (isApplicationsError && isEmployeesError) {
    return <Spinner />;
    }

    return(
        <div>
            <h1>{getEmployeeName(userData!.employeeId)} (HR Specialist)</h1>
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
                <Table />
            </div>
        </div>
    )
}

export default DashBoard;