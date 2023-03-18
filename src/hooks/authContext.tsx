import {useState,useEffect} from 'react';
import { ReactNode,useContext as usContextAuth } from "react";
import { createContext } from "react";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, UserCredential,onAuthStateChanged,signOut, User } from 'firebase/auth';

type UserType = User | null;
type LoadingType = boolean;

interface AuthContextType {
    user: UserType;
    loading: LoadingType;
    signIn: (email: string, password: string) =>  Promise<UserCredential>,
    logging: (email: string, password: string) =>  Promise<UserCredential>,
    logOut: () =>  Promise<void>;
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

    useEffect(()=>{
        onAuthStateChanged(auth,currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
    },[])

    return (
        <contextAuth.Provider value={{ signIn,logging, user, logOut, loading }}>{children}</contextAuth.Provider>
    )
}