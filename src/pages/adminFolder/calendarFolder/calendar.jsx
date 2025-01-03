import React, { useState, useEffect } from "react";
import "../../../css/calendar.css"; // Ensure the CSS file path is correct
import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState({});

  useEffect(() => {
    // Fetch calendar data when the month or year changes
    fetchCalendarData(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

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
        <div key={date} className="day">
          {day}
          <div className={`small-box red-box ${dayData.includes("Pregnancy") ? "glow" : ""}`} />
          <div className={`small-box blue-box ${dayData.includes("Contagious Disease") ? "glow" : ""}`} />
          <div className={`small-box green-box ${dayData.includes("Immunization") ? "glow" : ""}`} />
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div>
      <Topbar location="Calendar" />
      <div className="mainbarContent">
        <Sidebar />

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
            <div className="name">Calendar</div>
            <button onClick={handlePrevMonth}>Previous Month</button>
            <span>{`${getMonthName(currentMonth)} ${currentYear}`}</span>
            <button onClick={handleNextMonth}>Next Month</button>
          </div>
          <div className="calendar">
            {renderCalendar()}
          </div>

          <div className="activity-container">
            <div className="activity-table">
              <div className="activity-date"> Date {new Date().toLocaleDateString()}</div>
              <div className="activities">Activities</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
