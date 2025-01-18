import React, { useState, useEffect } from "react";
import "../../../css/calendar.css"; // Ensure the CSS file path is correct
import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";
import axios from 'axios';
import SidebarPatient from "../../bars/sideBarPatient";


const PatientCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD
  // New state for selected date
  const [activitiesDate, setActivitiesDate] = useState([]);
  const [Preview, setPreview] = useState('');

  
  // New state for selected date


  useEffect(() => {
    // Fetch calendar data when the month or year changes
    fetchCalendarData(currentMonth, currentYear);
    fetchActivity(selectedDate);
    

    console.log();
  }, [currentMonth, currentYear,selectedDate]);

  const fetchActivity = async (chosenDate) =>{
    try {
      const response = await axios.get('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/calendar/activitySelect.php', {
          params: {
              date: chosenDate // Pass the date as a query parameter
          }
      });

     
        console.log('Data received:', response.data);
        setActivitiesDate(response.data);
        setPreview(`../../../php/${response.data.image}` || '../../Images/blank_patient.jpg');
        console.log();
      
      // Handle the response as needed
  } catch (error) {
    setActivitiesDate(null);
      console.error('Error fetching data:', error);
  }
  }

  const fetchCalendarData = async (month, year) => {
    try {
      const response = await fetch(
        `http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/calendar/calendar.php?month=${month}&year=${year}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const formattedData = {};

      // Format data to be easily accessed by date
      data.forEach((item) => {
        const date = item.schedule_date;
        if (!formattedData[date]) {
          formattedData[date] = [];
        }
        formattedData[date].push(item.schedule_type);
      });

      setCalendarData(formattedData);
    } catch (error) {
      console.error("Error fetching calendar data:", error);
      setCalendarData({}); // Fallback to empty data
    }
  };

  const getMonthName = (month) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[month - 1];
  };

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day) => {
    const selectedDate = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(selectedDate);
  };
  

  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate(); // Total days in the month
    const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay(); // Weekday of the first day (0 = Sunday)
    const calendarDays = [];

    // Add blank boxes for days before the first day of the month
    for (let blank = 0; blank < firstDayOfWeek; blank++) {
      calendarDays.push(<div key={`blank-${blank}`} className="day blank"></div>);
    }

    // Add boxes for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentYear}-${String(currentMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayData = calendarData[date] || [];

      calendarDays.push(
        <div key={date} className="day" onClick={() => handleDayClick(day)}>
          {day}
          <div className={`small-box red-box ${dayData.includes("Pregnancy") ? "glow" : "empty-day"}`} />
          <div className={`small-box blue-box ${dayData.includes("Contagious Disease") ? "glow" : "empty-day"}`} />
          <div className={`small-box green-box ${dayData.includes("Immunization") ? "glow" : "empty-day"}`} />
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div>
      <Topbar location="Calendar" />
      <div className="mainbarContent">
        <SidebarPatient/>

        <div className="week">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>

        <div className="calendar-container">
          <div className="calendar-controls">
            <div className="name"></div>
            <button onClick={handlePrevMonth}>Previous Month</button>
            <span>{`${getMonthName(currentMonth)} ${currentYear}`}</span>
            <button onClick={handleNextMonth}>Next Month</button>
          </div>
          <div className="calendar">
            {renderCalendar()}
          </div>

          <div className="activity-container">
            <div className="activity-table">
              <div className="activity-date">Date: {selectedDate}</div> {/* Display selected date */}
              <div className="activities">
  {activitiesDate && activitiesDate.length > 0 ? (
    activitiesDate.map((data, index) => (
      <div className="activityDate-card" key={index}>
        <div className="activityDate-image">{data.image}</div>
        <div className="activityDate-patient">
          {data.first_name} {data.last_name}
        </div> <br/>
        <div className="activityDate-activity">{data.activity}</div>   
      </div>
    ))
  ) : (
    <div className="noActivity">
        <div className="noActiviy-text" style={{position:'relative',left:'5px',top:'20px'}}>No Activities Today</div>
        <div className="noActiviy-image"><img src="/Images/happy_nurse.jpg" alt=""  style={{position:'relative',left:'80px',top:'20px'}}/></div>

      
        </div> // Fallback message
  )}
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCalendar;
