import { useContextHook} from "../hooks/authContext";
import Table from "../components/Table";

function DashBoard(){
    const {logOut} = useContextHook();;
    const handleLogOut = async () => {
        await logOut();
    }
    return(
        <div>
            <h1>Hello from DashBoard (HR Specialist)</h1>
            <div>
                <button className="btn btn-primary" onClick={handleLogOut}>
                    Sign Out
                </button>
            </div>
            <>
                <Table />
            </>
        </div>
    )
}

export default DashBoard;