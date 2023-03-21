import { useContextHook} from "../hooks/authContext";
import { useUserCredentialsStore } from "../store/userCredentialsStore";

function Home(){
    const {userCredentials,setUserCredentials} = useUserCredentialsStore();
    const {logOut} = useContextHook();
    console.log(`What is this Home: ${userCredentials?.user}`);
    console.log(userCredentials?.user)
    const handleLogOut = async () => {
        await logOut();
        setUserCredentials(null);
    }

    return(
        <div>
            <h1>Hello from DashBoard (Employee)</h1>
            <h1>{userCredentials?.user!.email}</h1>
            <div>
                <button className="btn btn-primary" onClick={handleLogOut}>
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default Home;