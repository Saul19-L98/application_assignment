import { ApplicationType } from "../interfaces/sessionTypes"
import {useForm, SubmitHandler,useWatch } from 'react-hook-form';
import { useUserCredentialsStore } from '../store/userCredentialsStore';
import { v4 as uuidv4 } from "uuid";
import { db } from '../firebase.config';
import {doc, setDoc,} from 'firebase/firestore';
import { toast } from 'react-toastify';

interface ModalFormProps{
    refetchApplications:()=>void;
}

function ModalForm({refetchApplications}:ModalFormProps){
    const initialFormData: ApplicationType = {
        employeeId:"",
        medicalUnit: "",
        startDate: "",
        endDate: "",
        doctorName: "",
        medicalDiagnostic: "",
        coverageDays: 0,
    };

    const { employees } = useUserCredentialsStore();

    const { register,reset,control ,formState:{errors}, handleSubmit } = useForm<ApplicationType>({defaultValues:initialFormData});

    const startDate = useWatch({ control, name: 'startDate' });
    const endDate = useWatch({ control, name: 'endDate' });

    const handleReset = () => {
        reset();
    }

    const calculateCoverageDays = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInMilliseconds = end.getTime() - start.getTime();
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
        return differenceInDays;
    };
    const handleSubmitAction: SubmitHandler<ApplicationType> = async (data:ApplicationType) => {
        try{
            const modalCheckbox = document.getElementById('my-modal') as HTMLInputElement;
            const coverageDays = calculateCoverageDays(data.startDate,data.endDate);
            const appIdGenerated = uuidv4();
            const docRefapplication = doc(db,`applications/${appIdGenerated}`);
            const employeeFullName = employees?.find(employee => employee.employeeId === data.employeeId)?.fullName;

            if(docRefapplication){
                await setDoc(docRefapplication,{
                    employeeId: data.employeeId,
                    medicalUnit: data.medicalUnit,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    doctorName: data.doctorName,
                    medicalDiagnostic: data.medicalDiagnostic,
                    coverageDays: coverageDays,
                })
            }else{
                throw new Error("Error while sending the data.")
            }
            if (modalCheckbox) {
                modalCheckbox.checked = false;
            }
            handleReset();
            refetchApplications();
            toast.success(`Application created for: ${employeeFullName}`);
        }catch(error){
            toast.error("Something when wrong! 😯");
            console.error(`${error}`);
        }
    };
    return(
        <div className="modal-box  w-11/12 max-w-5xl">
            <div className="modal-action m-0" onClick={handleReset}>
                <label htmlFor="my-modal"className="btn">Close!</label>
            </div>
            <form onSubmit={handleSubmit(handleSubmitAction)} className="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4 flex flex-col justify-center">
                        <div className='mb-4'>
                            <label htmlFor="medicalUnit" className="block text-white text-xl font-bold mb-2">Select Employee</label>
                            <select
                                className="select select-info w-full max-w-xs"
                                id="employeeId"
                                {...register("employeeId", { required: true })}
                            >
                                {employees?.map((employee, index) => (
                                    <option key={index} value={employee.employeeId}>
                                        {employee.fullName}
                                    </option>
                                ))}
                            </select>
                            {errors.employeeId?.type === 'required' && <span className="text-red-500 text-xs italic">This field is required</span>}
                        </div>
                    </div>
                    <div>
                            <label htmlFor="medicalUnit" className="block text-white text-xl font-bold mb-2">Medical Unit</label>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    value="isss"
                                    className="checkbox checkbox-secondary"
                                    {...register("medicalUnit", { required: true })}
                                />
                                <label htmlFor="isss" className="mr-4">ISSS</label>
                                <input
                                    type="radio"
                                    value="minsal"
                                    className="checkbox checkbox-secondary"
                                    {...register("medicalUnit", { required: true })}
                                />
                                <label htmlFor="minsal" className="mr-4">MINSAL</label>
                                {errors.medicalUnit?.type === 'required' && <span className="text-red-500 text-xs italic">This field is required</span>}
                            </div>
                        </div>
                    <div className="mb-4 flex flex-col justify-center">
                        <label htmlFor="startDate" className="block text-white text-xl font-bold mb-2">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            className="input input-bordered input-secondary"
                            {...register("startDate", { required: true })}
                        />
                        {errors.startDate?.type === 'required' && <span className="text-red-500 text-xs italic">This field is required</span>}
                    </div>
                    <div className="mb-4 flex flex-col justify-center">
                        <label htmlFor="endDate" className="block text-white text-xl font-bold mb-2">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            className="input input-bordered input-secondary"
                            {...register("endDate", { required: true, validate: {
                                startDateLessThanEndDate: (value) => new Date(startDate) < new Date(value),
                            }, })}
                        />
                        {errors.endDate?.type === 'required' && <span className="text-red-500 text-xs italic">This field is required</span>}
                        {errors.endDate?.type === 'startDateLessThanEndDate' && (
                            <span className="text-red-500 text-xs italic">Start date must be less than end date</span>
                        )}
                    </div>
                    <div className="mb-4 flex flex-col justify-center">
                        <label htmlFor="doctorName" className="block text-white text-xl font-bold mb-2">Doctor Name</label>
                        <input
                            type="text"
                            id="doctorName"
                            className="input input-bordered input-secondary"
                            {...register("doctorName", {
                                required: true,
                            })}
                        />
                    {errors.medicalDiagnostic?.type === 'required' && <span className="text-red-500 text-xs italic">This field is required</span>}
                </div>
                <div className="mb-4 flex flex-col justify-center">
                    <label htmlFor="medicalDiagnostic" className="block text-white text-xl font-bold mb-2">Medical Diagnostic</label>
                    <textarea
                        className="textarea textarea-secondary"
                        id="description"
                        {...register("medicalDiagnostic", {
                            required: true,
                        })}
                    />
                    {errors.medicalDiagnostic?.type === 'required' && <span className="text-red-500 text-xs italic">This field is required</span>}
                </div>
            </div>
            <div className="flex justify-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Submit
                </button>
            </div>
        </form>
        </div>
    )
}
export default ModalForm;