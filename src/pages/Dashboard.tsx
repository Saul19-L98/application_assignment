import { useContextHook} from "../hooks/authContext";
import { useUserCredentialsStore } from "../store/userCredentialsStore";
import ModalForm from "../components/ModalForm";
import Table from "../components/Table";

function DashBoard(){
    const {setUserCredentials} = useUserCredentialsStore();
    const {logOut} = useContextHook();;
    const handleLogOut = async () => {
        await logOut();
        setUserCredentials(null);
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
            <>
                <Table />
            </>
        </div>
    )
}

export default DashBoard;