'use client'
import React from 'react'
import axios from 'axios'
import toast, {Toaster} from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ProfilePage() {
  const [data, setData] = React.useState("No user")
  const [isLoading , setIsLoading] = React.useState(false)
   const router = useRouter();

  const onLogOut = async () => {
  try {
     setIsLoading(true)
     const response = await axios.get("/api/users/logout");
    router.push("/login")
    console.log(response.data)
  } catch (error: unknown) {
  if (error instanceof Error)
    toast.error("Login Failed")
  }
}
const getUserData = async () =>{
  try {
    const res =  await axios.get("/api/users/me")
    setData(res.data.data._id)
  }catch (error: unknown) {
  if (error instanceof Error)
    throw new Error(error.message)
  }

}
  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
      <h1 className='text-3xl'>Profile Page</h1>
      <h2>{data === "No user" ? "No User details" : <Link href = {`/profile/${data}`}>UserID is {data}</Link>}</h2>
      <hr/>
      <button 
      onClick={onLogOut}
     className='border-blue-500 border-e-2 p-2 m-3 rounded-4xl cursor-pointer'>
        {isLoading ? " please wait..." : "Logout"}
      </button>
      <button  className='bg-blue-400 p-3 rounded-4xl cursor-pointer' onClick={getUserData}> GetUser ID</button>
      <Toaster />
    </div>
  )
}
