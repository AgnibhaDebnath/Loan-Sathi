import { create } from "zustand";
const useStore = create((set) => ({
    
        TotalLoanAmount: 0,
            TotalEMIAmount: 0,
                TotalActiveBorrowers: 0,
                    EMIPending: 0,
                        ApplicationDue: 0
    
}))
export default useStore;