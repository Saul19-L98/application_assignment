import React, { useState,useEffect, ChangeEvent, FormEvent } from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import { v4 as uuidv4 } from "uuid";
import { db } from '../firebase.config';
import {doc,collection,getDocs,DocumentData, setDoc} from 'firebase/firestore';

interface ApplicationType {
    employeeId:string;
    medicalUnit: string;
    startDate: string;
    endDate: string;
    doctorName: string;
    medicalDiagnostic: string;
    coverageDays: number;
}

interface EmployeeRequest{
    fullName:string,
    position:string,
    initialDate:string,
}

function ModalForm(){
    const initialFormData: ApplicationType = {
        employeeId:"",
        medicalUnit: "",
        startDate: "",
        endDate: "",
        doctorName: "",
        medicalDiagnostic: "",
        coverageDays: 0,
    };
    const [formData, setFormData] = useState<ApplicationType>(initialFormData);

    const { register, reset, formState:{errors}, handleSubmit } = useForm<ApplicationType>();

    const [employees, setEmployees] = useState<DocumentData[] >([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const employeesRef = collection(db,'employees');
            const employeeData = await getDocs(employeesRef);
            const newEmployees: DocumentData[] = [];
            employeeData.forEach((doc) => {
                newEmployees.push({...doc.data(),employeeId:doc.id});
            });
            setEmployees([...newEmployees]);
            console.log(employees)
        };

        fetchEmployees();
    }, []);

    const handleChange = ({target:{name,value}}: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const calculateCoverageDays = () => {
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);
        const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
        return differenceInDays;
    };
    const handleSubmitAction = async (event: FormEvent) => {
        event.preventDefault();
        const coverageDays = calculateCoverageDays();
        setFormData({ ...formData, coverageDays });
        const appIdGenerated = uuidv4();
        console.log('Form data:', formData);
        const docRefapplication = doc(db,`applications/${appIdGenerated}`);
        if(docRefapplication){
            await setDoc(docRefapplication,{
                employeeId: formData.employeeId,
                medicalUnit: formData.medicalUnit,
                startDate: formData.startDate,
                endDate: formData.endDate,
                doctorName: formData.doctorName,
                medicalDiagnostic: formData.medicalDiagnostic,
                coverageDays: coverageDays,
            })
        }

        const modalCheckbox = document.getElementById('my-modal') as HTMLInputElement;
        if (modalCheckbox) {
            modalCheckbox.checked = false;
        }
    };
    return(
        <div className="modal-box">
            <div className="modal-action">
                <label htmlFor="my-modal" className="btn">Yay!</label>
            </div>
            <form onSubmit={handleSubmitAction} className="mt-4 mb-4">
                <div className="mb-4 flex flex-col justify-center">
                    <div className='mb-4'>
                        <select
                            defaultValue={"DEFAULT"}
                            name="employeeId"
                            onChange={handleChange}
                            className="select select-info w-full max-w-xs"
                        >
                            <option value="DEFAULT" disabled>Select Employee</option>
                            {employees.map((employee, index) => (
                                <option key={index} value={employee.employeeId}>
                                    {employee.fullName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <label htmlFor="medicalUnit" className="block text-whie text-xl font-bold mb-2">Medical Unit</label>
                    <div className="flex items-center">
                        <input
                        type="radio"
                        name="medicalUnit"
                        value="isss"
                        checked={formData.medicalUnit === 'isss'}
                        onChange={handleChange}
                        className="checkbox checkbox-secondary"
                        />
                        <label htmlFor="isss" className="mr-4">ISSS</label>
                        <input
                        type="radio"
                        name="medicalUnit"
                        value="minsal"
                        checked={formData.medicalUnit === 'minsal'}
                        onChange={handleChange}
                        className="checkbox checkbox-secondary"
                        />
                        <label htmlFor="minsal">MINSAL</label>
                    </div>
                </div>
                <div className="mb-4 flex flex-col justify-center">
                    <label htmlFor="startDate" className="block text-whie text-xl font-bold mb-2">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="input input-bordered input-secondary"
                    />
                </div>
                <div className="mb-4 flex flex-col justify-center">
                    <label htmlFor="endDate" className="block text-whie text-xl font-bold mb-2">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="input input-bordered input-secondary"
                    />
                </div>
                <div className="mb-4 flex flex-col justify-center">
                    <label htmlFor="doctorName" className="block text-whie text-xl font-bold mb-2">Doctor Name</label>
                    <input
                        type="text"
                        name="doctorName"
                        value={formData.doctorName}
                        onChange={handleChange}
                        className="input input-bordered input-secondary"
                    />
                </div>
                <div className="mb-4 flex flex-col justify-center">
                    <label htmlFor="medicalDiagnostic" className="block text-whie text-xl font-bold mb-2">Medical Diagnostic</label>
                    <textarea
                        name="medicalDiagnostic"
                        value={formData.medicalDiagnostic}
                        onChange={handleChange}
                        className="textarea textarea-secondary"
                    ></textarea>
                </div>
                <div className="mb-4 flex flex-col justify-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit
                    </button>

                </div>
            </form>
        </div>
    )
}
export default ModalForm;