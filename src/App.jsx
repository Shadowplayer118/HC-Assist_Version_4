import Login from "./pages/login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/adminFolder/dashboardFolder/dashboard";
import Patient from "./pages/adminFolder/patientFolder/patient";
import Referrals from "./pages/adminFolder/referralFolder/referral";
import Pregnant from "./pages/adminFolder/pregnantFolder/pregnant";
import Child from "./pages/adminFolder/childFolder/child";
import Disease from "./pages/adminFolder/diseaseFolder/disease";
import Immunization from "./pages/adminFolder/immunizationFolder/immunization";
import Medicine from "./pages/adminFolder/medicineFolder/medicine";
import Staff from "./pages/adminFolder/staffFolder/staff";
import Calendar from "./pages/adminFolder/calendarFolder/calendar";
import Workflow from "./pages/adminFolder/workflowFolder/workflow";
import Patientselect_Disease from "./pages/adminFolder/diseaseFolder/disease-patientSelect";
import WorkflowSteps from "./pages/adminFolder/workflowFolder/workflowSteps";  // Make sure this import is correct
import ActiveWorkflowSteps from "./pages/adminFolder/workflowFolder/activeWorkflowSteps";
import ReportTable from "./pages/adminFolder/dashboardFolder/monthlyReport";

import PatientCalendar from "./pages/patientFolder/PatientCalendarFolder/PatientCalendar";

import StaffDashboard from "./pages/staffFolder/staffDashboardFolder/StaffDashboard";

import StaffActiveWorkflowSteps from "./pages/staffFolder/staffWorkflowFolder/StaffActiveWorkflowSteps";
import StaffWorkflowSteps from "./pages/staffFolder/staffWorkflowFolder/StaffWorkflowSteps";
import StaffWorkflow from "./pages/staffFolder/staffWorkflowFolder/Staffworkflow";


import MidwifePregnant from "./pages/midwifeFolder/midwifePregnantFolder/MidwifePregnant";
import MidwifeCalendar from "./pages/midwifeFolder/midwifeCalendarFolder/MidwifeCalendar";

function App() {
  return (
    <>

      <Routes>
        {/* Default route to login page */}
        <Route path="/" element={<Login />} />
        
        {/* Other routes */}
        
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/referral" element={<Referrals />} />
        <Route path="/pregnant" element={<Pregnant />} />
        <Route path="/child" element={<Child />} />
        <Route path="/disease" element={<Disease />} />
        <Route path="/immunization" element={<Immunization />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/workflow" element={<Workflow />} />
        <Route path="/disease-patientSelect" element={<Patientselect_Disease />} />
        <Route path="/workflowSteps/:workflow_id" element={<WorkflowSteps />} />
        <Route path="/activeWorkflowSteps/:activeWorkflow_id" element={<ActiveWorkflowSteps />} />
        <Route path="/monthlyReport" element={<ReportTable />} />




        <Route path="/PatientCalendar" element={<PatientCalendar/>} />





        <Route path="/StaffDashboard" element={<StaffDashboard/>} />
        
        <Route path="/Staffworkflow" element={<StaffWorkflow />} />
       
        <Route path="/StaffActiveWorkflowSteps/:activeWorkflow_id" element={<StaffActiveWorkflowSteps/>} />
        <Route path="/StaffWorkflowSteps/:workflow_id" element={<StaffWorkflowSteps/>} />

        


        <Route path="/MidwifePregnant" element={<MidwifePregnant/>} />
        <Route path="/MidwifeCalendar" element={<MidwifeCalendar/>} />




      </Routes>
    </>
  );
}

export default App;
