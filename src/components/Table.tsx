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
    const itemsPerPage = 6;

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
            <div className='flex justify-around mt-4'>
                <div className="mb-4">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="input input-secondary w-full max-w-xs"
                        placeholder="Employee Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='flex'>
                    <h5 className='mr-2'>Date range</h5>
                    <div className="mb-4 mr-2">
                        <input
                            placeholder="MM/DD/YYYY"
                            type="date"
                            name="startDate"
                            id="startDate"
                            className="input input-secondary w-full max-w-xs"
                            value={startDateFilter}
                            onChange={(e) => setStartDateFilter(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="date"
                            name="endDate"
                            id="endDate"
                            className="input input-bordered input-secondary w-full max-w-xs"
                            value={endDateFilter}
                            onChange={(e) => setEndDateFilter(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto md:block ml-4 mr-4">
                <table className="table table-compact w-full">
                    <thead className="border-b-2">
                        <tr>
                            <th></th> 
                            <th>Name</th> 
                            <th>Coverage Days</th> 
                            <th>Beginning of Coverage</th> 
                            <th>End of Coverage</th> 
                            <th>Doctor's Name</th> 
                            <th>Delete</th>
                        </tr>
                        </thead> 
                        <tbody className="divide-y divide-gray-100">
                            {filteredApplications?.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center text-gray-500 py-4">
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
                                    />
                                ))
                            }
                    </tbody>
                </table>
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