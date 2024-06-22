import { FC, MouseEventHandler } from 'react';

interface CustomButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
}

const CustomButton: FC<CustomButtonProps> = ({ onClick, text }) => (
  <button
    className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
    onClick={onClick}
  >
    {text}
  </button>
);

export default CustomButton;