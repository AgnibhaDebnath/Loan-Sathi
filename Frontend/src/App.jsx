import { Route, Routes } from "react-router-dom"
import { ModelProvider } from "./Contaxt/ModelContext"

import About from "./components/About"
import MyLoanHeader from "./components/MyLoanHeader"
import LoanStatus from "./components/LoanStatus"
import ProtectedRoute from "./components/ProtectedRoute"
import EMISection from "./components/EMISection"
import AdminEMISection from "./components/AdminEMISection"
import ProtectedrouteForAdmin from "./components/protectedRouteForAdmin"
import AdminHeader from "./components/AdminHeader"

import Home from "./Pages/Home"
import Admin from "./Pages/Admin"
function App() {


  const LoanStatusSection = () => {
    return (
      <>
        < MyLoanHeader></ MyLoanHeader>
        <LoanStatus></LoanStatus>
      </>
    )
  }
  const EmiSection = () => {
    return (
      <>
        < MyLoanHeader></ MyLoanHeader>
        <EMISection></EMISection>
      </>
    )
  }

  return (
    <>
      <ModelProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/borrower/LoanStatusSection" element={
            <ProtectedRoute>
              <LoanStatusSection />
            </ProtectedRoute>
          } />
          <Route path="/borrower/EMISection" element={
            <ProtectedRoute>
              <EmiSection />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedrouteForAdmin>
              <Admin />
            </ProtectedrouteForAdmin>
          } />


          <Route path="/admin/loans" element={
            <ProtectedrouteForAdmin>
              <AdminEMISection />
              <AdminHeader />
            </ProtectedrouteForAdmin>
          } />
        </Routes>
      </ModelProvider>

    </>
  )

}

export default App
