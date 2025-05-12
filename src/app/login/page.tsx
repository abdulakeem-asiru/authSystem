'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'
import axios from "axios"
import { useRouter } from 'next/navigation'
import toast, {Toaster} from "react-hot-toast"



export default function Loginpage() {
    const [user, setUser] = useState({
        password : "",
        email : ""
    })
    const router = useRouter();
        const [isLoading, setIsLoading] = useState(false)
        const [buttonDisabled, setButtonDisabled] = useState(true)
        const onLogin = async () => {
          try {
          setIsLoading(true)
           const response = await axios.post("/api/users/login", user)
           console.log(response.data)
           toast.success("Login successful")
           router.push("/profile")
           
          } catch (error : any) {
            toast.error("Login Failed", error.message)   
          }
            finally{
              setIsLoading(false)
            }
        }
        useEffect(() =>{
              if(user.email.length > 0 && user.password.length > 0 ){
                setButtonDisabled(false);
              }else
              setButtonDisabled(true)
            }, [user])
  return (
    <div className='flex min-h-screen justify-center items-center'>
        <div className=' flex flex-col justify-center items-center border-1 p-5  border-gray-600 rounded-2xl'>

      <h1 className='my-5 text-3xl'>Login</h1>
      <hr />
      <label htmlFor='email' className='w-[400px] p-3' >Username</label>
      <input  
      className='w-[400px] px-4 py-2 border border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm'
      type='text'
      id='email'
      required
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
      required
      value={user.password}
      onChange={(e) =>{
          setUser({...user, password:e.target.value})
        }}
        placeholder='Enter your password'/>

      <button 
      disabled={buttonDisabled}
      onClick={onLogin}
      className={`w-[200px] h-[50px] mt-5 text-white py-2 px-4 rounded-2xl shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
    ${buttonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
        {isLoading ? " please wait..." : "Login"}
      </button>
      <div className='mt-2'>Don&apos;t have an account?<Link href="/signup" className='text-blue-600'> SignUp</Link></div>
        </div>
        <Toaster />
    </div>
  )
}
