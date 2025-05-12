'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from "axios"
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'



export default function Signpage() {
    const [user, setUser] = React.useState({
        email : "",
        password : "",
        username : ""
    })
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const onSignUp = async () => {
      try {
      setIsLoading(true)
       const response = await axios.post("/api/users/signUp", user)
       console.log(response.data)
       router.push("/login")
       
      } catch (error : any) {
        toast.error("SignUp Failed", error.message)   
      }
        finally{
          setIsLoading(false)
        }
    }
    useEffect(() =>{
      if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
        setButtonDisabled(false);
      }else
      setButtonDisabled(true)
    }, [user])
  return (
    <div className='flex min-h-screen justify-center items-center'>
        <div className=' flex flex-col justify-center items-center border-1 p-5  border-gray-600 rounded-2xl'>

      <h1 className='my-5 text-3xl'>SignUp</h1>
      <hr />
      <label htmlFor='username' className='w-[400px] p-3' >Username</label>
      <input  
      className='w-[400px] px-4 py-2 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm'
      type='text'
      id='username'
      value={user.username}
      onChange={(e) =>{
          setUser({...user, username:e.target.value})
        }}
        placeholder='Enter your username'/>
      
      <label htmlFor='email' className='w-[400px] p-3 mt-5' >Email</label>
      <input  
      className='w-[400px] px-4 py-2 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm'
      type='email'
      id='email'
      value={user.email}
      onChange={(e) =>{
          setUser({...user, email:e.target.value})
        }}
        placeholder='Enter your email'/>

      <label htmlFor='password' className='w-[400px] p-3 mt-5' >Password</label>
      <input  
      className='w-[400px] px-4 py-2 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm'
      type='text'
      id='password'
      value={user.password}
      onChange={(e) =>{
          setUser({...user, password:e.target.value})
        }}
        placeholder='Enter your password'/>

      <button 
  disabled={buttonDisabled}
  onClick={onSignUp}
  className={`w-[200px] h-[50px] mt-5 text-white py-2 px-4 rounded-2xl shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
    ${buttonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
>
  {isLoading ? "Please wait..." : "signUp" }
</button>
      <div className='mt-2'>Already have an account?<Link href="/login" className='text-blue-600'> Login</Link></div>
        </div>
        <Toaster />
    </div>
  )
}
