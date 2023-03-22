import {useState} from 'react'
import TableRow from "./TableRow";
import { useUserCredentialsStore } from "../store/userCredentialsStore";

function Table() {

    const { employees, applications } = useUserCredentialsStore();

    // Add a state to manage the search term, start date, and end date
    const [searchTerm, setSearchTerm] = useState("");
    const [startDateFilter, setStartDateFilter] = useState("");
    const [endDateFilter, setEndDateFilter] = useState("");
    // Add a state to manage the current page
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({ name: "", diagnostic: "", coverage:0,sDate:"",eDate:"",nDoctor:"" });

    const handleModalClick = (name:string, diagnostic:string,coverage:number,sDate:string,eDate:string,nDoctor:string) => {
        setModalData({ name, diagnostic,coverage,sDate,eDate,nDoctor });
        setShowModal(true);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setStartDateFilter("");
        setEndDateFilter("");
    };

    // Get Employee's name
    const getEmployeeName = (employeeId: string) => {
        const employee = employees?.find((e) => e.employeeId === employeeId);
        return employee ? employee.fullName : "Unknown";
    };

    // Filter the applications based on the search term, start date, and end date
    const filteredApplications = applications?.filter((application) => {
        const employeeName = getEmployeeName(application.employeeId);

        const isNameMatch = searchTerm
        ? employeeName.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

        const isStartDateMatch = startDateFilter
        ? application.startDate >= startDateFilter
        : true;

        const isEndDateMatch = endDateFilter
        ? application.endDate <= endDateFilter
        : true;

        return isNameMatch && isStartDateMatch && isEndDateMatch;
    });

    // Slice the filteredApplications array based on the currentPage and itemsPerPage values
    const paginatedApplications = filteredApplications?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Calculate the total number of pages
    const totalPages = Math.ceil((filteredApplications?.length || 0) / itemsPerPage);

    // Create a function to handle changing the current page
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return(
        <>
            <div className="flex flex-col items-center md:flex-row md:justify-around items-start md:items-center">
                <div className='flex flex-col justify-center items-center md:flex-row md:items-center'>
                    <div className="w-full mb-4 mr-2 md:w-auto">
                        <label className="text-sm md:text-base mr-2">Search Employee</label>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="input input-secondary w-full md:max-w-xs"
                            placeholder="Employee Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center mb-4">
                    <div className="flex flex-col mb-2 md:mb-0 md:mr-2">
                        <label className="text-sm md:text-base mr-2">Start Date</label>
                        <input
                            placeholder="MM/DD/YYYY"
                            type="date"
                            name="startDate"
                            id="startDate"
                            className="input input-secondary w-full md:max-w-xs"
                            value={startDateFilter}
                            onChange={(e) => setStartDateFilter(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mb-2 md:mb-0 md:mr-2">
                        <label className="text-sm md:text-base mr-2">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            id="endDate"
                            className="input input-bordered input-secondary w-full md:max-w-xs"
                            value={endDateFilter}
                            onChange={(e) => setEndDateFilter(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={clearFilters}
                    >
                        Clear
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto md:block ml-4 mr-4">
                <table className="table table-compact w-full">
                    <thead className="border-b-2">
                        <tr>
                        <th></th>
                            <th>Name</th>
                            <th>Days</th>
                            <th className="hidden md:table-cell">Beginning of Coverage</th>
                            <th className="hidden md:table-cell">End of Coverage</th>
                            <th className="hidden lg:table-cell">Doctor's Name</th>
                            <th>Delete</th>
                        </tr>
                        </thead> 
                        <tbody className="divide-y divide-gray-100">
                            {filteredApplications?.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center text-gray-500 py-4">
                                        Sorry, there are no applications with this information
                                    </td>
                                </tr>
                            )}
                            {
                                paginatedApplications?.map((application,index) => (
                                    <TableRow 
                                        key={application.applicationId}
                                        rowNumber={(currentPage - 1) * itemsPerPage + index + 1}
                                        applicationId={application.applicationId}
                                        fullName={getEmployeeName(application.employeeId)} 
                                        coverageDays={application.coverageDays}
                                        startDate={application.startDate}
                                        endDate={application.endDate}
                                        doctorName={application.doctorName}
                                        medicalDiagnostic={application.medicalDiagnostic}
                                        onModalClick={handleModalClick}
                                    />
                                ))
                            }
                    </tbody>
                </table>
            </div>
            <div className={`modal modal-bottom sm:modal-middle ${showModal ? "modal-open" : ""}`}>
            <div className="modal-box">
                <h3 className="font-bold text-xl text-center mb-2">Employee Information</h3>
                <div className="card">
                    <div className="flex border-t border-white">
                    <p>
                        <span className="text-lg text-orange-200">Employee: </span>
                        {modalData.name}
                    </p>
                    </div>
                    <div className="border-t border-white">
                    <p>
                        <span className="text-lg text-orange-200">Doctor's Name: </span>
                        {modalData.nDoctor}
                    </p>
                    </div>
                    <div className="border-t border-white">
                    <p>
                        <span className="text-lg text-orange-200">Diagnostic: </span>
                        {modalData.diagnostic}
                    </p>
                    </div>
                    <div className="border-t border-white">
                    <p>
                        <span className="text-lg text-orange-200">Coverage Days: </span>
                        {modalData.coverage}
                    </p>
                    </div>
                    <div className="border-t border-white">
                    <p>
                        <span className="text-lg text-orange-200">Start Date: </span>
                        {modalData.sDate}
                    </p>
                    </div>
                    <div className="border-t border-white">
                    <p>
                        <span className="text-lg text-orange-200">End Date: </span>
                        {modalData.eDate}
                    </p>
                    </div>
                </div>
                <div className="modal-action">
                    <label htmlFor="my-modal-6" className="btn" onClick={() => setShowModal(false)}>
                    Close
                    </label>
                </div>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="btn btn-secondary mr-2"
                >
                    Previous
                </button>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="btn btn-secondary"
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default Table;