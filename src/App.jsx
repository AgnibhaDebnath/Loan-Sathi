import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import About from "./components/About"
import { Route, Routes } from "react-router-dom"
import LoanServices from "./components/LoanServices"
import Contact from "./components/contacts"
import FloatingEMICalculator from "./components/EMICalculation"
import { ModelProvider } from "./Contaxt/ModelContext"
import Apply from "./components/Apply"
import AdminDashboard from "./components/AdminDashBoard"
import LoanApplications from "./components/LoanApplication"
import AdminLogin from "./components/AdminLogin"
import MyLoanHeader from "./components/MyLoanHeader"
import LoanStatus from "./components/LoanStatus"
import Borrowerlogin from "./components/BorrowerLogin"
import ProtectedRoute from "./components/ProtectedRoute"
import EMISection from "./components/EMISection"
function App() {
  const Home = () => {


    return (

      <>
        <Header></Header>
        <HeroSection></HeroSection>
        <About></About>
        <FloatingEMICalculator></FloatingEMICalculator>
        <LoanServices></LoanServices>
        <Apply></Apply>
        <Contact></Contact>
        <AdminLogin></AdminLogin>
        <Borrowerlogin></Borrowerlogin>
      </>
    )
  }
  const Admin = () => {
    return (
      <>
        <div className="bg-black">
          <AdminDashboard></AdminDashboard>
          <LoanApplications></LoanApplications>
        </div>
      </>
    )
  }
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
          <Route path="/" element={<Admin />} />
          <Route path="/about" element={<About />} />

          <Route path="/LoanStatusSection" element={
            <ProtectedRoute>
              <LoanStatusSection />
            </ProtectedRoute>
          } />
          <Route path="/EMISection" element={
            <ProtectedRoute>
              <EmiSection />
            </ProtectedRoute>
          } />

        </Routes>
      </ModelProvider>

    </>
  )

}

export default App
