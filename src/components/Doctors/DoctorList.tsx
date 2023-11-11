import React from 'react';

import Link from 'next/link';

const doctors = [
    { id: 1, name: 'Mihail Popesko' },
    { id: 2, name: 'Linda Dumitrescu'},
    { id: 3, name: 'Pol Secruck' },
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

