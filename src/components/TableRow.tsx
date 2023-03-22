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
    onModalClick:(name:string,diagnostic:string,coverage:number,sDate:string,eDate:string,nDoctor:string)=>void;
}

function TableRow({applicationId,rowNumber,fullName,coverageDays,startDate,endDate,doctorName,medicalDiagnostic,onModalClick}:TableRowProps){

    const { removeApplication } = useUserCredentialsStore();

    const handleRowClick = (name:string, diagnostic:string) => {
        console.log('Name:', name);
        console.log('Medical Diagnostic:', diagnostic);
    }
    
    const deleteApplication = async (event:React.MouseEvent, applicationId: string) => {
        event.stopPropagation(); // Add this line to stop event propagation
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
        <tr 
            onClick={()=>onModalClick(fullName,medicalDiagnostic,coverageDays,startDate,endDate,doctorName)}
            className="hover cursor-pointer"
        >
            <th className="bg-purple-300">{rowNumber}</th> 
            <td>{fullName}</td> 
            <td >{coverageDays}</td> 
            <td className="hidden md:table-cell">{startDate}</td>
            <td className="hidden md:table-cell">{endDate}</td>
            <td className="hidden lg:table-cell">{doctorName}</td>
            <td><button onClick={(event) => deleteApplication(event,applicationId)} className="btn btn-active btn-primary">Button</button></td>
        </tr>
    )
}

export default TableRow;