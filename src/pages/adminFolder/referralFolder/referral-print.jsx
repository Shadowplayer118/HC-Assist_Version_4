import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PrintReferral = ({ visible, onClose, data }) => {
  if (!visible) return null;

  const downloadPDF = async () => {
    const content = document.querySelector(".printReferral-modal-content");
  
    const canvas = await html2canvas(content, {
      scale: 2, // Improves image quality
    });
  
    const imgData = canvas.toDataURL("image/png");
  
    // Set up jsPDF with standard A4 paper size
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4", // Standard A4 size
    });
  
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
  
    // Calculate the width and height of the content for scaling
    const contentWidth = content.offsetWidth;
    const contentHeight = content.offsetHeight;
  
    // Scale the content to fit within the A4 width while maintaining aspect ratio
    const scaleFactor = pageWidth / contentWidth;
    const scaledHeight = contentHeight * scaleFactor;
  
    // Add the image at the top of the PDF
    pdf.addImage(
      imgData,
      "PNG",
      0, // X position (top left corner)
      10, // Y position (adds some margin from the top)
      pageWidth, // Scaled width
      scaledHeight // Scaled height
    );
  
    pdf.save("Patient_Referral.pdf");
  };
  

  return (
    <div className="printReferral-modal">
      <div className="printReferral-modal-content">
        <h3 className="printReferral-title">Patient Referral</h3>
        <div className="printReferral-details">
          <div className="printReferral-conf">
            <div className="printReferral-num">
              Referral #: {data.referral_id}
            </div>
            <div className="printReferral-date">
              Date: {data.referral_date}
            </div>
          </div>

          <div className="printReferral-content">
            <div className="printReferral-name">
              <strong>Patient Name:</strong> {data.first_name + " " + data.last_name}
            </div>

            <strong>Description:</strong>
            <div className="printReferral-desc">{data.description}</div>

            <div className="printReferral-cred">
              <div>.</div>
              <div className="printReferral-approve">Approved by</div>
              <div className="printReferral-approveDateCont">
                {data.referral_date}
              </div>
              <div className="printReferral-approve printReferral-approveDate">
                Date Approved
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="printReferral-btns">

      <button onClick={downloadPDF} className="download-printReferral">
        Download PDF
      </button>

      <button onClick={onClose} className="close-printReferral">
        Close
      </button>

      </div>

    
    </div>
  );
};

export default PrintReferral;
