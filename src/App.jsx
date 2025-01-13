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
import Patientselect_Referral from "./pages/adminFolder/referralFolder/referral-patientSelect";
import Patientselect_Pregnant from "./pages/adminFolder/pregnantFolder/pregnant-patientSelect";
import Patientselect_Immunization from "./pages/adminFolder/immunizationFolder/immunization-patientSelect";
import Patientselect_Child from "./pages/adminFolder/childFolder/child-patientSelect";
import MedicalRecord from "./pages/adminFolder/medicalFolder/medical";
import Patientselect_Medical from "./pages/adminFolder/medicalFolder/medical-patientSelect";
import PatientDashbaord from "./pages/patientFolder/PatientDashboardFolder/patientDashboard";


import StaffChild from "./pages/staffFolder/staffChildFolder/Staffchild";
import StaffDisease from "./pages/staffFolder/staffDiseaseFolder/Staffdisease";
import StaffImmunization from "./pages/staffFolder/staffImmunizationFolder/Staffimmunization";
import StaffMedicalRecord from "./pages/staffFolder/staffMedicalFolder/Staffmedical";
import StaffMedicine from "./pages/staffFolder/staffMedicineFolder/Staffmedicine";
import StaffPatientTable from "./pages/staffFolder/staffPatientFolder/Staffpatient";
import StaffPregnant from "./pages/staffFolder/staffPregnantFolder/Staffpregnant";
import StaffReferrals from "./pages/staffFolder/staffReferralFolder/Staffreferral";
import StaffCalendar from "./pages/staffFolder/staffCalendarFolder/Staffcalendar";

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
        <Route path="/pregnant-patientSelect" element={<Patientselect_Pregnant/>} />
        <Route path="/child" element={<Child />} />
        <Route path="/child-patientSelect" element={<Patientselect_Child />} />
        <Route path="/disease" element={<Disease />} />
        <Route path="/immunization" element={<Immunization />} />
        <Route path="/immunization-patientSelect" element={<Patientselect_Immunization />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/workflow" element={<Workflow />} />
        <Route path="/disease-patientSelect" element={<Patientselect_Disease />} />
        <Route path="/referral-patientSelect" element={<Patientselect_Referral />} />
        <Route path="/workflowSteps/:workflow_id" element={<WorkflowSteps />} />
        <Route path="/activeWorkflowSteps/:activeWorkflow_id" element={<ActiveWorkflowSteps />} />
        <Route path="/monthlyReport" element={<ReportTable />} />
        <Route path="/medical" element={<MedicalRecord />} />
        <Route path="/medical-patientSelect" element={<Patientselect_Medical />} />








        <Route path="/PatientCalendar" element={<PatientCalendar/>} />
        <Route path="/patientDashboard" element={<PatientDashbaord/>} />






        <Route path="/StaffDashboard" element={<StaffDashboard/>} />
        <Route path="/Staffworkflow" element={<StaffWorkflow />} />
        <Route path="/StaffActiveWorkflowSteps/:activeWorkflow_id" element={<StaffActiveWorkflowSteps/>} />
        <Route path="/StaffWorkflowSteps/:workflow_id" element={<StaffWorkflowSteps/>} />

        <Route path="/Staffchild" element={<StaffChild/>} />
        <Route path="/Staffdisease" element={<StaffDisease/>} />
        <Route path="/Staffimmunization" element={<StaffImmunization/>} />
        <Route path="/Staffmedical" element={<StaffMedicalRecord/>} />
        <Route path="/Staffmedicine" element={<StaffMedicine/>} />
        <Route path="/Staffpatient" element={<StaffPatientTable/>} />
        <Route path="/Staffpregnant" element={<StaffPregnant/>} />
        <Route path="/Staffreferral" element={<StaffReferrals/>} />
        <Route path="/Staffcalendar" element={<StaffCalendar/>} />








        


        <Route path="/MidwifePregnant" element={<MidwifePregnant/>} />
        <Route path="/MidwifeCalendar" element={<MidwifeCalendar/>} />




      </Routes>
    </>
  );
}

export default App;
