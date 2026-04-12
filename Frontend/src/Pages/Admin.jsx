import AdminHeader from "@/components/AdminHeader";
import AdminDashboard from "@/components/AdminDashBoard";
import LoanApplications from "@/components/LoanApplication";
import AddLoanDetails from "@/components/AddLoanDetails";
const Admin = () => {
    return (
        <>
            <div className="">
                <AdminHeader></AdminHeader>
                <AdminDashboard></AdminDashboard>
                <LoanApplications></LoanApplications>
            </div>
            <AddLoanDetails></AddLoanDetails>

        </>
    )
}
export default Admin;