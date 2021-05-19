import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function Calender() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((response) => {
        setEvents(response);
      })
      .catch((err) => console.error(err));
  };
  console.log(events);

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        events={events}
        endAccessor="end"
        defaultDate={moment().toDate()}
      />
    </div>
  );
}

export default Calender;
