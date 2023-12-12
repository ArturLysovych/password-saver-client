import React, { useState } from 'react';
import Image from 'next/image';
import eye_img from '../app/home/assets/eye.png';
interface PasswordItemProps {
  service: string;
  password: string;
  onDelete: () => void;
}

const Password: React.FC<PasswordItemProps> = ({ service, password, onDelete }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
      <div className="password">
        <div className='flex items-center justify-between gap-2 w-28'>
          <h2 className='text-lg'>{service}</h2>
          <p className='te text-2xl'>|</p>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <input type={showPassword ? 'text' : 'password'} className='bg-transparent w-40 outline-none border-none text-center' readOnly value={password} />
        </div>
        <div className='flex items-center justify-center gap-2'>
          <Image className='bg-white h-auto w-8 rounded-md cursor-pointer' src={eye_img} alt="" 
          onClick={togglePasswordVisibility}
          />
          <button className='bg-white text-red-400 p-1 w-20 rounded-lg cursor-pointer' onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    );
};

export default Password;
