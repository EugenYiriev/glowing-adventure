import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarOrgProps {
  doctorId: number;
}

export function CalendarOrg({ doctorId }: CalendarOrgProps) {
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState<{ date: string; time: string; description: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEventDescription, setNewEventDescription] = useState('');
  const [newEventTime, setNewEventTime] = useState('');

  useEffect(() => {
    const storedEvents = localStorage.getItem(`events-${doctorId}`);
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, [doctorId]);

  const validateTime = (time: string) => {
    const pattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return pattern.test(time);
  };

  const isTimeAvailable = (time: string) => {
    const existingEventsOnDate = events.filter((event) => event.date === selectedDate.toISOString());
  
    const selectedTime = new Date(`${selectedDate.toISOString().split('T')[0]}T${time}`);
    const nineAM = new Date(`${selectedDate.toISOString().split('T')[0]}T09:00:00`);
    const sixPM = new Date(`${selectedDate.toISOString().split('T')[0]}T18:00:00`);
    const onePM = new Date(`${selectedDate.toISOString().split('T')[0]}T13:00:00`);
    const lastAppointmentBeforeLunch = new Date(`${selectedDate.toISOString().split('T')[0]}T12:30:00`);
    const lastAppointmentBeforeEndOfDay = new Date(`${selectedDate.toISOString().split('T')[0]}T17:30:00`);
  
    const isBeforeLunch = selectedTime < onePM;
    const isDuringLunch = selectedTime >= onePM && selectedTime <= lastAppointmentBeforeLunch;
    const isBeforeEndOfDay = selectedTime <= sixPM;
  
    const isTimeAvailable =
      !existingEventsOnDate.some((event) => event.time === time) &&
      ((isBeforeLunch && selectedTime >= nineAM && selectedTime <= lastAppointmentBeforeLunch) ||
        (isDuringLunch && selectedTime > lastAppointmentBeforeLunch && selectedTime <= lastAppointmentBeforeEndOfDay) ||
        (isBeforeEndOfDay && selectedTime > lastAppointmentBeforeEndOfDay));
  

    const isNextHalfHourAvailable = Array.from({ length: 6 }, (_, i) => {
      const intervalStart = i * 30;
      const intervalEnd = (i + 1) * 30;
      const intervalStartInMs = intervalStart * 60 * 1000;
      const intervalEndInMs = intervalEnd * 60 * 1000;
  
      return !existingEventsOnDate.some((event) => {
        const existingEventTime = new Date(`${selectedDate.toISOString().split('T')[0]}T${event.time}`);
        const timeDifference = Math.abs(selectedTime.getTime() - existingEventTime.getTime());
  
        return timeDifference >= intervalStartInMs && timeDifference < intervalEndInMs;
      });
    }).some(Boolean);
  
    return isTimeAvailable && isNextHalfHourAvailable;
  };
  
  

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleDeleteEvent = (eventIndex: number) => {
    const updatedEvents = [...events];
    updatedEvents.splice(eventIndex, 1);
    setEvents(updatedEvents);

    localStorage.setItem(`events-${doctorId}`, JSON.stringify(updatedEvents));
  };

  const handleAddEvent = () => {
    if (
      newEventDescription.trim() !== '' &&
      newEventTime.trim() !== '' &&
      validateTime(newEventTime) &&
      isTimeAvailable(newEventTime)
    ) {
      const newEvent = {
        date: selectedDate.toISOString(),
        time: newEventTime,
        description: newEventDescription,
      };
      setEvents([...events, newEvent]);
      setNewEventDescription('');
      setNewEventTime('');

      localStorage.setItem(`events-${doctorId}`, JSON.stringify([...events, newEvent]));
    } else {
      alert('Invalid time or time slot is already booked.');
    }
  };

  return (
    <div>
      <Calendar onChange={onChange as any} value={value} onClickDay={handleDateClick} />
      <div>
        <h2>Add an event</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddEvent(); }}>
          <label>
            Description:
            <input
              type="text"
              value={newEventDescription}
              onChange={(e) => setNewEventDescription(e.target.value)}
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              value={newEventTime}
              onChange={(e) => setNewEventTime(e.target.value)}
            />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
      {events
        .filter((event) => event.date === selectedDate.toISOString())
        .map((event, index) => (
          <div key={index}>
            <p>Date: {new Date(event.date).toDateString()}</p>
            <p>Time: {event.time}</p>
            <p>Description: {event.description}</p>
            <button onClick={() => handleDeleteEvent(index)}>Delete</button>
          </div>
        ))}
    </div>
  );
}
