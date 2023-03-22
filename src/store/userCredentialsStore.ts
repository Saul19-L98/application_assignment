import {create} from 'zustand';
import {UserCredential} from "firebase/auth";
import {UserData,EmployeesData,ApplicationData} from "../interfaces/sessionTypes"

interface UserCredentialsState {
    userCredentials: UserCredential | null;
    employees: EmployeesData[] | null;
    applications: ApplicationData[] | null;
    userData: UserData | null;
    setUserCredentials: (credentials: UserCredential | null) => void;
    setEmployees: (employees: EmployeesData[] | null) => void;
    setApplications: (applications: ApplicationData[] | null) => void;
    removeApplication: (applicationId: string) => void;
    setUserData: (user: UserData | null) => void;
}

export const useUserCredentialsStore = create<UserCredentialsState>((set) => ({
    userCredentials: null,
    employees: null,
    applications: null,
    userData:null,
    setUserCredentials: (credentials) => set({ userCredentials: credentials }),
    setEmployees: (employees) => set({ employees: employees }),
    setApplications: (applications) => set({ applications: applications }),
    removeApplication: (applicationId) =>
    set((state) => ({
        applications: state.applications!.filter(
            (application) => application.applicationId !== applicationId
        ),
    })),
    setUserData: (user) => set({ userData: user }),
}));