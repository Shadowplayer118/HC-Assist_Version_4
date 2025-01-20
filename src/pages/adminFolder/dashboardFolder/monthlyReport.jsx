import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";
import '../../../css/dashboard.css';

const ReportTable = ({visible, onClose}) => {

    if (!visible) {
      return null;
    }


  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the PHP API
    axios
      .get("http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/dashboard/monthlyReports.php")
      .then((response) => {
        if (response.data.status === "success") {
          setReportData(response.data.data);
        } else {
          setError(response.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch the data.");
        setLoading(false);
      });
  }, []);

  const handleDelete = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const generatePDF = () => {
    const input = document.querySelector(".report-form"); // Select the report-form div
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Patient_and_Health_Report.pdf");
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="report-mainbarContent">
  <div>
    <div className="generateReportBtn">
      <button onClick={generatePDF}>Download PDF</button>
      <button className="onClose" onClick={onClose}>Close</button>
    </div>

    <div className="report-form">
      <h2 className="report-form-title">Patient and Health Report <div className="report-form-location">Barangay Brgy_name, Municipality</div><div className="report-form-subtitle">Health Center records as of January 1-31 2025</div></h2>
      

      
      {/* Manually position each metric */}

      <h3>Medical Reports</h3>
   

    <div className="generateReport-compress">

    <div className="report-item">
        <span className="report-label">Total Patients: </span>
        <span className="report-value">{reportData.total_patients}</span>
      </div>

      
      <div className="report-item">
        <span className="report-label">Total Males: </span>
        <span className="report-value">{reportData.total_boys}</span>
      </div>

      <div className="report-item">
        <span className="report-label">Total Females: </span>
        <span className="report-value">{reportData.total_girls}</span>
      </div>

    </div>

    

    <div className="generateReport-compress">
    </div>

    <div className="generateReport-compress">

    <div className="report-item">
        <span className="report-label">Average Weight: </span>
        <span className="report-value">{reportData.avg_weight}</span>
      </div>

       <div className="report-item">
        <span className="report-label">Average Height: </span>
        <span className="report-value">{reportData.avg_height}</span>
      </div>

      <div className="report-item">
        <span className="report-label">Average BP: </span>
        <span className="report-value">{reportData.avg_blood_pressure}</span>
      </div>

    </div>



    <div className="generateReport-compress">

    <div className="report-item">
        <span className="report-label">Average Heart-Rate: </span>
        <span className="report-value">{reportData.avg_heart_rate}</span>
      </div>



      <div className="report-item">
        <span className="report-label">Average Temperature: </span>
        <span className="report-value">{reportData.avg_temperature}</span>
      </div>

    </div>

      
     

    

   




      <div className="report-item">
        <span className="report-label">Total Senior Citizens: </span>
        <span className="report-value">{reportData.total_seniors}</span>
      </div>


      <div className="report-item">
        <span className="report-label">Total Contagious Disease: </span>
        <span className="report-value">{reportData.active_diseases}</span>
      </div>

      <h3>Pregnancy Data</h3>

      <div className="generateReport-compress">
      <div className="report-item">
        <span className="report-label">Total Pregnancies: </span>
        <span className="report-value">{reportData.total_pregnancies}</span>
      </div>

      <div className="report-item">
        <span className="report-label">Delivered Pregnancies: </span>
        <span className="report-value">{reportData.total_delivered_pregnancies}</span>
      </div>
      </div>

      <div className="generateReport-compress">
      <div className="report-item">
        <span className="report-label">Ongoing Preganacies: </span>
        <span className="report-value">{reportData.total_ongoing_pregnancies}</span>
      </div>

      <div className="report-item">
        <span className="report-label">Miscarriage: </span>
        <span className="report-value">{reportData.total_miscarriage_pregnancies}</span>
      </div>
      </div>

   

    

      <div className="report-item">
        <span className="report-label">Total Immunizations: </span>
        <span className="report-value">{reportData.total_immunizations}</span>
      </div>


      <div className="report-item">
        <span className="report-label">Total Apporved Referrals: </span>
        <span className="report-value">{reportData.approved_referrals}</span>
      </div>


      <h3>Children Data</h3>


  

      <div className="generateReport-compress">
      <div className="report-item">
        <span className="report-label">Total Children: </span>
        <span className="report-value">{reportData.total_children}</span>
      </div>

 
      </div>
      <div className="generateReport-compress">

      <div className="report-item">
        <span className="report-label">Average Child Weight: </span>
        <span className="report-value">{reportData.avg_child_weight}</span>
      </div>

      <div className="report-item">
        <span className="report-label">Average Child Weight: </span>
        <span className="report-value">{reportData.avg_child_weight}</span>
      </div>

      </div>
      
    <div className="generateReport-compress">

    <div className="report-item">
        <span className="report-label">Average Child Height: </span>
        <span className="report-value">{reportData.avg_child_height}</span>
      </div>


      <div className="report-item">
        <span className="report-label">Average Child BP: </span>
        <span className="report-value">{reportData.avg_child_blood_pressure}</span>
      </div>
    </div>

    
    <div className="generateReport-compress">

    <div className="report-item">
        <span className="report-label">Average Child Heart-Rate: </span>
        <span className="report-value">{reportData.avg_child_heart_rate}</span>
      </div>

      <div className="report-item">
        <span className="report-label">Average Child : </span>
        <span className="report-value">{reportData.avg_child_temperature}</span>
      </div>
    </div>


   





  


      {/* Add more items similarly */}
    </div>
  </div>
</div>

  );
};

// Format keys for display
const formatKey = (key) => {
  return key
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/avg /, "Average ") // Add "Average" for avg_* fields
    .replace(/total /, "Total ") // Add "Total" for total_* fields
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letters
};

export default ReportTable;
