import React from "react";
import '../../css/topBar.css'

function Topbar(props) {
  return (

<div className="top">
      <div className="top-content">
        <h1 className="title">HC-Assist</h1>
        <h1 className="location">Application &gt; {props.location}</h1>
        <div className="profile">
          <img src="../assets/profile.jpg" alt="Profile" />
        </div>
      </div>
    </div>


    
  );
}

export default Topbar;
