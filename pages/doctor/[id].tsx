// pages/doctor/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import { DoctorCard } from '../../src/components/Doctors/DoctorCard/DoctorCard';

const doctors = [
  { id: 1, name: 'Doctor 1', specialty: 'Main' },
  { id: 2, name: 'Doctor 2', specialty: 'Med brother' },
];

const DoctorPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const doctorId = Number(id);

  const doctor = doctors.find((doc) => doc.id === doctorId);

  return (
    <div>
      <h1>Doctor Details</h1>

      {doctor ? (
        <DoctorCard id={doctor.id} name={doctor.name} specialty={doctor.specialty} />
      ) : (
        <div>Doctor not found</div>
      )}
    </div>
  );
};

export default DoctorPage;
