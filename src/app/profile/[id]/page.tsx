import React from 'react'

export default async function UserProfile({params}: any) {
  return (
    <div className='flex min-h-screen justify-center items-center'>
      <p className='text-3xl'>User profile</p>
      <span className='bg-orange-500 text-black p-2 ml-2 rounded text-2xl'>{params.id}</span>
    </div>
  )
}
