import React from 'react';
import { CalendarOrg } from '../../../components/Calendar/Calendar';

interface DoctorCardProps {
  id: number;
  name: string;
  specialty: string;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ id, name, specialty }) => {
  return (
    <div className="doctor-card">
      <h2>{name}</h2>
      <p>{specialty}</p>

      <CalendarOrg doctorId={id} />
    </div>
  );
};
