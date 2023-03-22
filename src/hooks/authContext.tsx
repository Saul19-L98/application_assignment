import {useState,useEffect} from 'react';
import { ReactNode,useContext as usContextAuth } from "react";
import { createContext } from "react";
import { auth,db } from "../firebase.config";
import { getDoc, doc} from "firebase/firestore";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, UserCredential,onAuthStateChanged,signOut, User } from 'firebase/auth';

type UserType = User | null;
type LoadingType = boolean;

interface UserData{
    rol:string;
    employeeId:string;
}

interface AuthContextType {
    user: UserType;
    loading: LoadingType;
    signIn: (email: string, password: string) =>  Promise<UserCredential>,
    logging: (email: string, password: string) =>  Promise<UserCredential>,
    logOut: () =>  Promise<void>;
    getUserRole: (uid: string) => Promise<UserData | null>;
};

interface AuthProviderProps{
    children: ReactNode;
};

export const contextAuth = createContext<AuthContextType>({
    user: null,
    loading: true,
    signIn: async () => {
        throw new Error("signIn function not implemented");
    }, // provide a default empty function
    logging: async () => {
        throw new Error("signIn function not implemented");
    }, // provide a default empty function
    logOut: async () => {
        throw new Error("signOut function not implemented");
    },
    getUserRole: async () => { 
        throw new Error("getUserRole function not implemented");
    },
});

//Hook
export const useContextHook = () => {
    const context = usContextAuth(contextAuth);
    if(!context) throw new Error("The AuthProvider is not working correctly.")
    return context as AuthContextType;
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user,setUser] = useState<UserType>(null);
    const [loading,setLoading] = useState<LoadingType>(true);

    const signIn = (email:string,password:string) => 
        createUserWithEmailAndPassword(auth, email,password);

    const logging = (email:string,password:string) => signInWithEmailAndPassword(auth, email,password);

    const logOut = () => signOut(auth);

    const getUserRole = async (uid: string): Promise<UserData | null> => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data())
        if (docSnap.exists()) {
            return docSnap.data() as UserData;
        } else {
            return null;
        }
    };

    useEffect(()=>{
        onAuthStateChanged(auth,currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
    },[])

    return (
        <contextAuth.Provider value={{ signIn,logging, user, logOut, loading,getUserRole }}>{children}</contextAuth.Provider>
    )
}