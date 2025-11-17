import React from 'react';
import { COLORS } from '../constants/colors';

interface CardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div
      className="rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
      style={{ backgroundColor: COLORS.secondary.whiteCard, border: `1px solid ${COLORS.secondary.greyText}` }}
    >
      <h2
        className="text-2xl font-bold mb-3"
        style={{ color: COLORS.primary.darkBlueText }}
      >
        {title}
      </h2>
      <p className="text-base mb-4" style={{ color: COLORS.secondary.greyText }}>
        {description}
      </p>
      {children}
    </div>
  );
};

export default Card;