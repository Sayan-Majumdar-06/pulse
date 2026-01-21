import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

  const navigate = useNavigate();
  return (
    <div className='bg-[#40404b] w-full h-screen flex flex-col gap-8 items-center justify-center font-montserrat text-white'>
      <div className='flex flex-col gap-2 items-center'>
        <h1 className='text-6xl sm:text-9xl font-bold text-[#08d9d6] glitch' data-text='404'>404</h1>
        <p className='mt-4 text-xl w-4/5 sm:w-full sm:text-3xl text-center'>Looks like this page fell out of the pulse</p>
      </div>

      <div>
        <button className='p-2 sm:p-3 rounded-xl cursor-pointer shadow-[0_0_15px_rgba(255,46,99,0.4)] transition-[all_0.25s_ease] hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,46,99,0.7)] bg-[#ff2e62cd]' onClick={()=>navigate('/')}>Go Home</button>
      </div>
    </div>
  )
}

export default NotFound