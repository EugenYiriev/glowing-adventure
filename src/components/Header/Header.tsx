import React from 'react';
import 'tailwindcss/tailwind.css';

import { HomeButton } from '../Button/HomeButton';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h1 className="text-black text-center ">{title}</h1>

      <HomeButton />
    </header>
  );
};


