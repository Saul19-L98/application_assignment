import { useQuery } from 'react-query';
import { db } from '../firebase.config';
import { useUserCredentialsStore } from '../store/userCredentialsStore';
import { collection, getDocs, DocumentData } from 'firebase/firestore';

interface ApplicationData {
    // Define the fields you expect in the "applications" collection
    // Add more fields as needed
    applicationId:string;
    employeeId: string;
    medicalUnit: string;
    startDate: string;
    endDate: string;
    doctorName: string;
    medicalDiagnostic: string;
    coverageDays: number;
}


async function fetchApplications(): Promise<DocumentData[]> {
    const applicationsRef = collection(db, 'applications');
    const applicationsSnapshot = await getDocs(applicationsRef);
    const applications: DocumentData[] = applicationsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        applicationId: doc.id,
    })) as DocumentData[];
    return applications;
}

export function useApplications() {
    
    const {setApplications} = useUserCredentialsStore();

        return useQuery<DocumentData[], Error>('applications', fetchApplications, {
        onSuccess: (data) => {
            setApplications(data as ApplicationData[]);
        },
    });
}