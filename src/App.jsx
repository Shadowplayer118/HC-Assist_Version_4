
import Login from "./pages/login"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/adminFolder/dashboardFolder/dashboard"
import Patient from "./pages/adminFolder/patientFolder/patient"
import Referrals from "./pages/adminFolder/referralFolder/referral"
import Pregnant from "./pages/adminFolder/pregnantFolder/pregnant"
import Child from "./pages/adminFolder/childFolder/child"
import Disease from "./pages/adminFolder/diseaseFolder/disease"
import Immunization from "./pages/adminFolder/immunizationFolder/immunization"
import Medicine from "./pages/adminFolder/medicineFolder/medicine"
import Staff from "./pages/adminFolder/staffFolder/staff"
import Calendar from "./pages/adminFolder/calendarFolder/calendar"
import Workflow from "./pages/adminFolder/workflowFolder/workflow"
import Patientselect_Disease from "./pages/adminFolder/diseaseFolder/disease-patientSelect"
function App() {
 
  return (
    <>
     <Routes>
      <Route path="/login" element={<Login></Login>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/patient" element={<Patient/>}/>
      <Route path="/referral" element={<Referrals/>}/>
      <Route path="/pregnant" element={<Pregnant/>}/>
      <Route path="/child" element={<Child/>}/>
      <Route path="/disease" element={<Disease/>}/>
      <Route path="/immunization" element={<Immunization/>}/>
      <Route path="/medicine" element={<Medicine/>}/>
      <Route path="/staff" element={<Staff/>}/>
      <Route path="/calendar" element={<Calendar/>}/>
      <Route path="/workflow" element={<Workflow/>}/>
      <Route path="/disease-patientSelect" element={<Patientselect_Disease/>}/>





     </Routes>
    </>
  )
}

export default App
