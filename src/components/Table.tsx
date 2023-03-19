function Table() {
    return(
    <div className="overflow-x-auto md:block">
        <table className="table table-compact w-full">
            <thead className="border-b-2">
                <tr>
                    <th></th> 
                    <th>Name</th> 
                    <th>Job</th> 
                    <th>company</th> 
                    <th>location</th> 
                    <th>Last Login</th> 
                    <th>Favorite Color</th>
                </tr>
                </thead> 
                <tbody className="divide-y divide-gray-100">
                <tr>
                    <th className="bg-purple-300">1</th> 
                    <td>Cy Ganderton</td> 
                    <td>Quality Control Specialist</td> 
                    <td>Littel, Schaden and Vandervort</td> 
                    <td>Canada</td> 
                    <td>12/16/2020</td> 
                    <td><button className="btn btn-active btn-primary">Button</button></td>
                </tr>
                <tr>
                    <th>2</th> 
                    <td>Hart Hagerty</td> 
                    <td>Desktop Support Technician</td> 
                    <td>Zemlak, Daniel and Leannon</td> 
                    <td>United States</td> 
                    <td>12/5/2020</td> 
                    <td><button className="btn btn-active btn-primary">Button</button></td>
                </tr>
                <tr>
                    <th className="bg-purple-300">3</th> 
                    <td>Brice Swyre</td> 
                    <td>Tax Accountant</td> 
                    <td>Carroll Group</td> 
                    <td>China</td> 
                    <td>8/15/2020</td> 
                    <td><button className="btn btn-active btn-primary">Button</button></td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}

export default Table;