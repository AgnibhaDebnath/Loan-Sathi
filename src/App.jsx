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
import MyLoansection from "./components/MyLoanSection"
import AdminLogin from "./components/AdminLogin"
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
  const Borrower = () => {
    return (
      <MyLoansection></MyLoansection>
    )
  }

  return (
    <>
      <ModelProvider>
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/MyLoansection" element={<Borrower />} />
        </Routes>
      </ModelProvider>

    </>
  )

}

export default App
