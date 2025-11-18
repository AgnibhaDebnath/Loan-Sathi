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
        <AdminDashboard></AdminDashboard>
        <LoanApplications></LoanApplications>
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

  return (
    <>
      <ModelProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/LoanStatusSection" element={<LoanStatusSection />} />
        </Routes>
      </ModelProvider>

    </>
  )

}

export default App
