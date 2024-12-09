
import Login from "./pages/login"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/adminFolder/dashboardFolder/dashboard"
import Patient from "./pages/adminFolder/patientFolder/patient"
import Referrals from "./pages/adminFolder/referralFolder/referral"
function App() {
 
  return (
    <>
     <Routes>
      <Route path="/login" element={<Login></Login>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/patient" element={<Patient/>}/>
      <Route path="/referral" element={<Referrals/>}/>

      

     </Routes>
    </>
  )
}

export default App
