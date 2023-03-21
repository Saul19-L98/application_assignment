import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import { useUserCredentialsStore } from "../store/userCredentialsStore";
import { toast } from 'react-toastify';
interface TableRowProps{
    applicationId:string;
    rowNumber:number;
    fullName:string; 
    coverageDays:number;
    startDate:string;
    endDate:string;
    doctorName:string;
    medicalDiagnostic:string;
}

function TableRow({applicationId,rowNumber,fullName,coverageDays,startDate,endDate,doctorName,medicalDiagnostic}:TableRowProps){

    const { removeApplication } = useUserCredentialsStore();
    
    const deleteApplication = async (applicationId: string) => {
        try {
            const applicationDoc = doc(db, "applications", applicationId);
            await deleteDoc(applicationDoc);
            console.log("Application deleted successfully!");
            removeApplication(applicationId); // Remove the application from the global state
            toast.success(`Application of ${fullName} was deleted`);
        } catch (error) {
            console.error("Error deleting application: ", error);
            toast.error(`Error while trying to delete application for ${fullName}`);
        }
    };

    return (
        <tr>
            <th className="bg-purple-300">{rowNumber}</th> 
            <td>{fullName}</td> 
            <td>{coverageDays}</td> 
            <td>{startDate}</td> 
            <td>{endDate}</td> 
            <td>{doctorName}</td> 
            <td><button onClick={() => deleteApplication(applicationId)} className="btn btn-active btn-primary">Button</button></td>
        </tr>
    )
}

export default TableRow;