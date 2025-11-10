import { create } from "zustand";
const useStore = create((set) => ({
    
        TotalLoanAmount: 0,
            TotalEMIAmount: 0,
                TotalActiveBorrower: 0,
                    EMIPending: 0,
                        ApplicationDue: 0
    
}))
export default useStore;