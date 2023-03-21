function Table() {
    return(
    <div className="overflow-x-auto md:block">
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
                    
            </tbody>
        </table>
    </div>
    )
}

export default Table;