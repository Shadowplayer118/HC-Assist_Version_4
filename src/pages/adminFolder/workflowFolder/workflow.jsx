import React from 'react';
import '../../../css/dashboard.css'
import '../../../css/patient.css'
import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";
import Mainbar from "../../bars/mainBar";


import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

const Workflow = () => {
  return (

    <div>
      <Topbar location="Patient"/>
      <Sidebar />
      Workflow
    </div>
       
  );
};

export default Workflow;
