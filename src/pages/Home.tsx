import { useContextHook} from "../context/authContext";


function Home(){
    const {user} = useContextHook();
    console.log(user)
    return(
        <div>
            <h1>Hello from Home</h1>
        </div>
    )
}

export default Home;