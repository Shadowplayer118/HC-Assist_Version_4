import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../../css/workflow.css';


const AddWorkflow = ({ visible, onClose, data }) => {
  if (!visible) return null; // Prevent rendering when modal is not visible

  const [title, setTitle] = useState(""); // Title of the workflow
  const [description, setDescription] = useState(""); // Description of the workflow
  const [steps, setSteps] = useState([]); // Array of steps

  // Populate form with existing data if available
  useEffect(() => {

    
    addStep();
  

    

    if (data) {
    
      setTitle(data.title || "");
      setDescription(data.description || "");
      setSteps(data.steps || []);
      
    }
  }, [data]);

  // Add a new step
  const addStep = () => {
    setSteps([...steps, ""]); // Add an empty step
  };

  

  // Handle step text change
  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  // Remove a step
  const removeStep = (index) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const workflowData = {
      title,
      description,
      steps,
    };

    try {
      const response = await axios.post(
        "http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/workflow/addWorkflow.php",
        workflowData
      );
      if (response.data.status === "success") {
        alert("Workflow added successfully!");
        onClose(); // Close modal on success
      } else if(response.data.status === "error"){
        alert("Failed to add workflow.");
      }
    } catch (error) {
      console.error("Error adding workflow:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="add-modal">
      <div className="add-modal-content">
        <h3 className="add-modal-title">Add Workflow</h3>

      <div className="workflow_form">

      <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="workflow-title">Title:</label><br />
            <input
              type="text"
              id="workflow-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          <div className="input-container">
            <label htmlFor="workflow-description">Description:</label><br />
            <textarea
              id="workflow-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          
       

          <div className="input-container">
            <label>Steps:</label>
            <button type="button" className="add-step-btn" onClick={addStep}>
              Add Step
            </button>
            <div className="steps-container">
              {steps.map((step, index) => (
                <div key={index} className="step-input">
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    required
                  />
                  <button
                    type="button"
                    className="remove-step-btn"
                    onClick={() => removeStep(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
         
          </div>

          <button type="submit" className="save-workflow">
            Save Changes
          </button>

          

        </form>

      </div>
        
        <button onClick={onClose}>
          <span className="close-workflow" id="close-workflow">
            Close
          </span>
        </button>
      </div>
    </div>
  );
};

export default AddWorkflow;
