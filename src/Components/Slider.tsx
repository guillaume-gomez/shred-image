import React from 'react';

interface SliderProps {
  onChange: (value: number) => void;
  value: number;
  label: string;
  min: number;
  max: number;
}

function Slider({ value, onChange, label, min, max} : SliderProps ) {
  return (
    <div className="flex flex-col">
      <label className="flex flex-row items-center gap-2">
        {label}
        <div className="badge badge-accent">{value}</div>
      </label>
      <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="range range-primary"
        />
    </div>
  );
}

export default Slider;
