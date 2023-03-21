import {create} from 'zustand';
import { persist } from "zustand/middleware";
import {UserCredential} from "firebase/auth";
import {DocumentData} from "firebase/firestore"

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
    setUserCredentials: (credentials: UserCredential | null) => void;
    setEmployees: (employees: EmployeesData[] | null) => void;
    setApplications: (applications: ApplicationData[] | null) => void;
    removeApplication: (applicationId: string) => void;
}

export const useUserCredentialsStore = create<UserCredentialsState>((set) => ({
    userCredentials: null,
    employees: null,
    applications: null,
    setUserCredentials: (credentials) => set({ userCredentials: credentials }),
    setEmployees: (employees) => set({ employees: employees }),
    setApplications: (applications) => set({ applications: applications }),
    removeApplication: (applicationId) =>
    set((state) => ({
        applications: state.applications!.filter(
            (application) => application.applicationId !== applicationId
        ),
    })),
}));