
const AdminEMISection = () => {

    return (
        <>

            <div className="flex justify-center bg-black py-2 items-center">
                <h1 className="text-5xl text-white block font-bold">EMI Section</h1>
            </div>
            <div className="bg-black">


                <div className="flex flex-col items-center  pb-3">

                    <div className="p-5  rounded-3xl mx-4 md:w-3/4 w-11/12 border-gray-400 border-2">

                        <div className=" w-full overflow-x-auto">
                            <table className="border-collapse border-2 border-green-200 min-w-[800px] w-full">
                                <thead className="bg-gradient-to-r from-teal-500 to-cyan-500  brightness-125">
                                    <tr  >
                                        <th className="border-r border-gray-300 p-2 text-left text-base font-medium">Borrower name</th>
                                        <th className="border-r border-gray-300 p-2 text-left text-base font-medium">Loan ID</th>
                                        <th className="border-r border-gray-300 p-2 text-left text-base font-medium">EMI status</th>
                                        <th className="border-r border-gray-300 p-2 text-left text-base font-medium">EMI amount</th>
                                        <th className="border-r border-gray-300 p-2 text-lefttext-base font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )

}
export default AdminEMISection