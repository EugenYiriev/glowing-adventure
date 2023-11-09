import React from 'react';

import Link from 'next/link';

const doctors = [
    { id: 1, name: 'Doctor 1'},
    { id: 2, name: 'Doctor 2'},
];

export function DoctorList() {
    return (
        <div>
            <div className="doctor-list">
                {doctors.map((doctor) => (
                    <div key={doctor.id}>
                        <Link href={`/doctor/${doctor.id}`}>
                            <p> {doctor.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

