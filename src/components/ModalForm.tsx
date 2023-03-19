import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    medicalUnit: string;
    startDate: string;
    endDate: string;
    doctorName: string;
    medicalDiagnostic: string;
    coverageDays: number;
}

const initialFormData: FormData = {
    medicalUnit: '',
    startDate: '',
    endDate: '',
    doctorName: '',
    medicalDiagnostic: '',
    coverageDays: 0,
};

function ModalForm(){
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
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
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const coverageDays = calculateCoverageDays();
        console.log('Form data:', { ...formData, coverageDays });
        // Handle form submission logic here

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
            <form onSubmit={handleSubmit} className="mt-4 mb-4">
                <div className="mb-4 flex flex-col justify-center">
                    <label htmlFor="medicalUnit" className="block text-gray-700 text-sm font-bold mb-2">Medical Unit</label>
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
                    <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="input input-bordered input-secondary"
                    />
                </div>
                <div className="mb-4 flex flex-col justify-center">
                    <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="input input-bordered input-secondary"
                    />
                </div>
                <div className="mb-4 flex flex-col justify-center">
                    <label htmlFor="doctorName" className="block text-gray-700 text-sm font-bold mb-2">Doctor Name</label>
                    <input
                        type="text"
                        name="doctorName"
                        value={formData.doctorName}
                        onChange={handleChange}
                        className="input input-bordered input-secondary"
                    />
                </div>
                <div className="mb-4 flex flex-col justify-center">
                    <label htmlFor="medicalDiagnostic" className="block text-gray-700 text-sm font-bold mb-2">Medical Diagnostic</label>
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