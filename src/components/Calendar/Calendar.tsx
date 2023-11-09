import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarOrgProps {
  doctorId: number;
}

export function CalendarOrg({ doctorId }: CalendarOrgProps) {
  const [value, onChange] = useState(new Date());
  const [events, setEvents] = useState<{ date: string; description: string }[]>([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem(`events-${doctorId}`);
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, [doctorId]);

  const handleDateClick = (date: Date) => {
    const description = prompt('Введите описание события:');

    if (description) {
      const newEvent = { date: date.toISOString(), description };
      setEvents([...events, newEvent]);

      localStorage.setItem(`events-${doctorId}`, JSON.stringify([...events, newEvent]));
    }
  };

  const handleDeleteEvent = (eventIndex: number) => {
    const updatedEvents = [...events];
    updatedEvents.splice(eventIndex, 1);
    setEvents(updatedEvents);

    localStorage.setItem(`events-${doctorId}`, JSON.stringify(updatedEvents));
  };

  return (
    <div>
      <Calendar
        onChange={onChange as any}
        value={value}
        onClickDay={handleDateClick}
      />
      {events.map((event, index) => (
        <div key={index}>
          <p>Date: {new Date(event.date).toDateString()}</p>
          <p>Description: {event.description}</p>
          <button onClick={() => handleDeleteEvent(index)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}
