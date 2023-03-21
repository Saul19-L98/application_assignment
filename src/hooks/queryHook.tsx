import { useQuery } from 'react-query';
import { db } from '../firebase.config';
import { useUserCredentialsStore } from '../store/userCredentialsStore';
import { collection, getDocs, DocumentData } from 'firebase/firestore';

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

const fetchApplications = async (): Promise<DocumentData[]> => {
    const applicationsRef = collection(db, 'applications');
    const applicationsDocs = await getDocs(applicationsRef);
    const applications: DocumentData[] = applicationsDocs.docs.map((doc) => ({
        ...doc.data(),
        applicationId: doc.id,
    }));
    return applications;
}

const fetchEmployees = async (): Promise<DocumentData[]> => {
    const employeesRef = collection(db, 'employees');
    const employeesDocs = await getDocs(employeesRef);
    const employeesData: DocumentData[] = employeesDocs.docs.map((doc) => ({
        ...doc.data(), employeeId: doc.id 
    }));
    return employeesData;
};

export function useApplications() {
    const {setApplications} = useUserCredentialsStore();
    return useQuery<DocumentData[], Error>('applications', fetchApplications, {
        onSuccess: (data) => {
            setApplications(data as ApplicationData[]);
        },
    });
};

export function useEmployees(){
    const {setEmployees} = useUserCredentialsStore();
    return useQuery<DocumentData[], Error>('employees', fetchEmployees, {
        onSuccess: (data) => {
            setEmployees(data as EmployeesData[]);
        },
    });
}