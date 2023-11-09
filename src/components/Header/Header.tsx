import React from 'react';
import 'tailwindcss/tailwind.css';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h1 className="text-black text-center ">{title}</h1>
    </header>
  );
};


