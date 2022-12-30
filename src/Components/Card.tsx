import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title: string;
}

function Card({ children, title } : CardProps ) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Card;
