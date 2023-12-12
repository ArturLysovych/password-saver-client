'use client'
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import Password from '../components/password';

export default function Home() {
    const queryParams = queryString.parse(window.location.search);
    const cleanParams = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key.replace('?', ''), value])
    );
  
    const userAccount = cleanParams;

    const [passwords, setPasswords] = useState([]);

    const getInfo = ():void => {
        axios.get(`http://localhost:3001/passwords/${userAccount._id}`)
        .then((response: any) => {
            setPasswords(response.data);
        })
    }
    useEffect(() => {
        getInfo();
    }, []);

    const handleDeletePassword = async (passwordId: string) => {
        await axios.delete(`http://localhost:3001/passwords/delete-password?_id=${passwordId}`);
        getInfo();
    }

    const createPassword = () => {

    }
    
    return (
        <div className="w-full h-screen flex flex-col justify-between items-center bg-red-400">
            <header className='h-2 w-4/5 bg-white flex items-center justify-between p-8 rounded-b-xl'>
                <h2 className='text-lg'>Password saver</h2>
                <div className="flex items-center justify-center gap-4">
                    <h3 className='text-lg'>{userAccount.login}</h3>
                    <div className="h-10 w-10 bg-red-400 rounded-full"></div>
                </div>
            </header>
            <div className="w-4/5 flex justify-between items-center gap-6">
                <div className="w-3/5 max-h-120 h-120 rounded-l-xl bg-white pt-4 pb-4 pl-6 pr-6 overflow-y-scroll">
                    {passwords.map((password: any) => (
                        <Password 
                            key={password._id}
                            service={password.service}
                            password={password.password}
                            onDelete={() => handleDeletePassword(password._id)}
                        />
                    ))}
                </div>
                <div className="w-2/5 h-full bg-white rounded-r-xl p-6 flex flex-col items-center justify-between">
                    <h2 className='text-xl'>Create Password</h2>
                    <div className="w-full h-auto bg-red-400 rounded-lg">
                        <form className='flex flex-col gap-3 p-4'>
                            <input type="text" className='login-input' placeholder='service' />
                            <input type="text" className='login-input' placeholder='password' />
                            <button type='submit' className='w-full h-10 bg-white rounded-md'>create</button>
                        </form>
                    </div>
                    <div className="self-end text-gray-400">{passwords.length} passwords created</div>
                </div>
            </div>
            
            <div className="h-2 w-4/5 bg-white flex items-center justify-end p-8 rounded-t-xl">
                <button className='p-1 w-20 bg-red-400 text-white rounded-lg'>Log out</button>
            </div>
        </div>
    );
};
