
"use client";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export function CalendarOrg() {
    const [value, onChange] = useState(new Date());

    return (
        <div>

            <Calendar
                onChange={onChange as any}
                value={value}
            />

        </div>
    );
}