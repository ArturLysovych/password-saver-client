'use client'
import Link from "next/link"
import axios from "axios"
import { useState } from "react"

export default function RegForm() {
    const [loginVal, setLoginVal] = useState('');
    const [passwordVal, setPasswordVal] = useState('');
    const [emailVal, setEmailVal] = useState('');

    const user = { login: loginVal, password: passwordVal, email: emailVal };

    const postUser = (user: Object) => {
        const postData = user;

        axios.post('http://localhost:3001/users/register-user', postData)
        .then((response) => {
            alert(response.data);
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
              <h2 className="text-center text-lg">Create account</h2>
              <input type="text" placeholder="Login" className="register-input" 
                value={loginVal}
                onChange={(e) => setLoginVal(e.target.value)}
              />
              <input type="password" placeholder="Password" className="register-input" 
                value={passwordVal}
                onChange={(e) => setPasswordVal(e.target.value)}
              />
              <input type="email" placeholder="Email" className="register-input" 
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
              />
              <button type="submit" className="w-full p-2 border-2 rounded-md">Sign up</button>
              <p className="text-sm mt-6">Have already an account?
                <Link href="/login">
                  <span className="underline cursor-pointer ml-1">Login here</span>
                </Link>
              </p>
            </form>
        </div>
    )
}
  