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
   
      <div className="">

        <div className="generateReportBtn">
            <button onClick={generatePDF}>Download PDF</button>
            <button className="onClose" onClick={onClose}>Close</button>
        </div>
   
            
        <div className="report-form">
          <h2 className="report-form-title">Patient and Health Report</h2>
          <table className="report-form-table">
            <thead className="report-form-header">
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody className="report-form-data">
              {Object.entries(reportData).map(([key, value]) => (
                <tr key={key}>
                  <td>{formatKey(key)}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
