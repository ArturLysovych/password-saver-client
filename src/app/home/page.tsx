'use client'
import React, { useState, useEffect, use } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import Link from 'next/link';
import Password from '@/components/password';

export default function Home() {
    const [serviceVal, setServiceVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');

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

    const createPassword = async (serviceVal: string, passwordVal: string) => {
        const postData = {
            userId: userAccount._id,
            userLogin: userAccount.login,
            service: serviceVal,
            password: passwordVal,
        }
        await axios.post('http://localhost:3001/passwords/create-password', postData)
        getInfo();
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
            <div className="w-4/5 flex justify-between items-center gap-3">
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
                <div className="w-2/5 h-full rounded-r-xl flex flex-col items-center justify-between gap-3">
                    <div className="h-2/5 w-full bg-white p-6 rounded-tr-lg flex flex-col items-center justify-center">
                        <h2 className='text-3xl'>Create Password</h2>
                        <div className="text-gray-400 text-xl">{passwords.length} passwords created</div>
                    </div>
                    <div className="w-full bg-white h-3/5 rounded-br-lg flex items-center justify-center">
                        <form className='h-auto w-5/6 flex flex-col gap-3 p-4 bg-red-400 rounded-lg' onSubmit={(e) => {
                            e.preventDefault();
                            createPassword(serviceVal, passwordVal);
                        }}>
                            <input required type="text" className='login-input' placeholder='service' 
                                value={serviceVal}
                                onChange={(e) => setServiceVal(e.target.value)}
                            />
                            <input required type="text" className='login-input' placeholder='password'
                                value={passwordVal}
                                onChange={(e) => setPasswordVal(e.target.value)}
                            />
                            <button type='submit' className='w-full h-10 bg-white rounded-md'>create</button>
                        </form>
                    </div>
                </div>
            </div>
            
            <div className="h-2 w-4/5 bg-white flex items-center justify-end p-8 rounded-t-xl">
                <Link href='/'>
                    <button className='p-1 w-20 bg-red-400 text-white rounded-lg'>Log out</button>
                </Link>
            </div>
        </div>
    );
};
