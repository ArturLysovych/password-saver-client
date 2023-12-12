'use client'
import Link from "next/link"
import { useState } from "react"
import axios from "axios"

export default function LogForm() {
    const [loginVal, setLoginVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');

    const user = { login: loginVal, password: passwordVal };
    
    const postUser = (user: any) => {
        const postData = user;

        axios.post('http://localhost:3001/users/login-user', postData)
        .then((response) => {
            if(response.data.login === user.login) {
                alert('Succesfully login');
                const queryString = `?_id=${response.data._id}&?login=${response.data.login}&?password=${response.data.password}&?email=${response.data.email}`;
                const newPath = `/home${queryString}`;
              
                window.location.href = newPath;
            }
            else if (response.data === false) alert('False data');
            else alert(response.data);
        })
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-red-400">
            <form className="h-auto max-w-sm bg-white border-2 flex flex-col items-center justify-between gap-3 p-8 rounded-xl"
                onSubmit={(e) => {
                    e.preventDefault();
                    postUser(user);
                }}
            >
              <h2 className="text-center text-lg">Login here</h2>
              <input type="text" placeholder="Login" className="login-input" 
                value={loginVal}
                onChange={(e) => setLoginVal(e.target.value)}
              />
              <input type="password" placeholder="Password" className="login-input" 
                value={passwordVal}
                onChange={(e) => setPasswordVal(e.target.value)}
              />
              <button className="w-full p-2 border-2 rounded-md">Sign in</button>
              <p className="text-sm mt-6">Don't have an account yet? 
                <Link href="/register">
                  <span className="underline cursor-pointer ml-1">Register here</span>
                </Link>
              </p>
            </form>
        </div>
    )
}
