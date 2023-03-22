import {create} from 'zustand';
import { persist } from "zustand/middleware";
import {UserCredential} from "firebase/auth";

interface UserData{
    rol:string;
    employeeId:string;
}

interface ApplicationData {
    applicationId:string;
    employeeId: string;
    medicalUnit: string;
    startDate: string;
    endDate: string;
    doctorName: string;
    medicalDiagnostic: string;
    coverageDays: number;
}

interface EmployeesData{
    employeeId:string;
    fullName:string;
    position:string;
    initialDate:string;
}

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