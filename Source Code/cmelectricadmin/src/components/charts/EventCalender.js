import React, { useEffect, useState,useRef } from 'react';
import Chart from 'react-apexcharts';
import '../../assets/css/Overview.css';
import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import axios from 'axios';

const EventCalender = () => {
    const [events, setEvents] = useState([]);
    const [tempevents, setTempEvents] = useState(null);
    
    useEffect(() => {
          axios.get('http://localhost:8080/getcalbookings', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
          .then(response => {
            let bookings=[]
            response.data.forEach(user=>{
                var _title=user.service+" inspection for " +user.user_Name+" "+user.user_Surname+"\n Technician:"+user.technician
                var book={
                    title: ''+_title+'',
                    date: ''+user.appointmentDate+''
                    
                }
                user.clienttaskdates.forEach(tdate=>{
                  var _ttitle=user.service+" installation/maintanance for " +user.user_Name+" "+user.user_Surname+"\n Technician:"+user.technician
                  var _book={
                    title: ''+_ttitle+'',
                    date: ''+tdate.clienttaskdate+''
                    
                }
                bookings.push(_book)
                });
                bookings.push(book)
            });
            setTempEvents(bookings);
            console.log(response.data);
          })
          .catch(error => {
            console.log(error.message);
          });
        
      }, [tempevents]);
      // Function to handle the modal close
      useEffect(() => {
        if (tempevents) {
          setEvents(tempevents);
        }
      }, [tempevents]);
    
    // calendar.render()
   const calendarRef = useRef(null);

  const changeView = (view) => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(view);
    }
  };
   const renderEventContent = (eventInfo) => {
    return (
      <div style={{ whiteSpace: 'normal', maxWidth: 'none', textOverflow: 'ellipsis', overflow: 'hidden',fontSize: '12px'}}>
        {eventInfo.event.title}
      </div>
    );
  };
    return(
        <div>
            
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventContent={renderEventContent}
            />
            {/* <div className="btn-group">
                <button onClick={() => changeView('dayGridMonth')}>Month</button>
                <button onClick={() => changeView('timeGridWeek')}>Week</button>
                <button onClick={() => changeView('listWeek')}>List</button>
            </div> */}
        </div>
    );
};
export default EventCalender;
