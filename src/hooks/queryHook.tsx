import {ApplicationData,EmployeesData} from "../interfaces/sessionTypes";
import { useQuery } from 'react-query';
import { db } from '../firebase.config';
import { useUserCredentialsStore } from '../store/userCredentialsStore';
import { collection, getDocs, DocumentData,getDoc,doc,where,query } from 'firebase/firestore';

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

const fetchApplicationsByEmployeeId = async (employeeId: string): Promise<DocumentData[]> => {
    const applicationsRef = collection(db, 'applications');
    const q = query(applicationsRef, where("employeeId", "==", employeeId));
    const applicationsDocs = await getDocs(q);
    const applications: DocumentData[] = applicationsDocs.docs.map((doc) => ({
        ...doc.data(),
        applicationId: doc.id,
    }));
    return applications;
}

const fetchEmployee = async (employeeId: string): Promise<DocumentData> => {
    const employeeRef = doc(db, 'employees', employeeId);
    const employeeDoc = await getDoc(employeeRef);
    const employeeData = {
        ...employeeDoc.data(),
        employeeId: employeeDoc.id,
    };
    return employeeData;
};

/////////////////////////////////////////////////////////////////////////////
//NOTE: Work with Dashborad.tsx
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
/////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////
//NOTE: Work with Home.tsx
export function useApplicationByEmployee(employeeId: string) {
    const { setApplications } = useUserCredentialsStore();
    return useQuery<DocumentData[], Error>(['applications', employeeId], () => fetchApplicationsByEmployeeId(employeeId), {
        onSuccess: (data) => {
            setApplications(data as ApplicationData[]);
        },
    });
};

export function useEmployee(employeeId: string) {
    const { setEmployees } = useUserCredentialsStore();
    return useQuery<DocumentData, Error>(['employee', employeeId], () => fetchEmployee(employeeId), {
        onSuccess: (data) => {
            setEmployees([data] as EmployeesData[]);
        },
    });
}
/////////////////////////////////////////////////////////////////////////////