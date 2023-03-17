import { ReactNode,useContext as usContextAuth } from "react";
import { createContext } from "react";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';

interface User {
    login: boolean;
};

interface AuthContextType {
    user: User,
    signIn: (email: string, password: string) =>  Promise<UserCredential>,
};

interface AuthProviderProps{
    children: ReactNode;
};

export const contextAuth = createContext<AuthContextType>({
    user: { login: false },
    signIn: async () => {
        throw new Error("signIn function not implemented");
    }, // provide a default empty function
});

//Hook
export const useContextHook = () => {
    const context = usContextAuth(contextAuth);
    if(!context) throw new Error("The AuthProvider is not working correctly.")
    return context as AuthContextType;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const user: User = {
        login: true,
    };
    const signIn = (email:string,password:string) => 
        createUserWithEmailAndPassword(auth, email,password);
    return (
        <contextAuth.Provider value={{ signIn, user }}>{children}</contextAuth.Provider>
    )
}