import { useContextHook} from "../hooks/authContext";


function Home(){

    const {user,logOut} = useContextHook();
    console.log(user!);

    const handleLogOut = async () => {
        await logOut();
    }

    return(
        <div>
            <h1>{user!.email}</h1>
            <div>
                <button className="btn btn-primary" onClick={handleLogOut}>
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default Home;