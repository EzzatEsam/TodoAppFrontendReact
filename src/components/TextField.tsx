import React from "react";
import "../index.css";
const TextField: React.FC<{
  label: string;
  inputType: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ label, inputType, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700">
        {label}
      </label>
      <input
        type={inputType}
        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default TextField;
