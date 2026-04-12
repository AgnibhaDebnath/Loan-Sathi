import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import FloatingEMICalculator from "@/components/EMICalculation";
import LoanServices from "@/components/LoanServices";
import LoanRules from "@/components/loanRules";
import Apply from "@/components/Apply";
import Contact from "@/components/contacts";
import AdminLogin from "@/components/AdminLogin";
import Borrowerlogin from "@/components/BorrowerLogin";
const Home = () => {
    return (
        <>
            <Header></Header>
            <HeroSection></HeroSection>
            <About></About>
            <FloatingEMICalculator></FloatingEMICalculator>
            <LoanServices></LoanServices>
            <LoanRules ></LoanRules>
            <Apply></Apply>
            <Contact></Contact>
            <AdminLogin></AdminLogin>
            <Borrowerlogin></Borrowerlogin>
        </>
    )
}
export default Home;