import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full h-screen home-bg flex justify-center items-center font-outfit text-[#EAEAEA]'>
        <div className='flex flex-col gap-8 items-center max-w-[300px] md:max-w-[700px]'>
          <h1 className='text-5xl md:text-7xl mb-4 font-bold hero-title text-center'>Find Your Pulse</h1>

          <div className='text-xl md:text-2xl text-center hero-text'>
            <p>A simple focus timer designed for deep, uninterrupted work.</p>
            <p>Start a session, stay present, and let time flow</p>
          </div>

          <div className='flex gap-16'>
            <button className='px-8 py-4 rounded-xl cursor-pointer shadow-[0_0_15px_rgba(255,46,99,0.4)] transition-[all_0.25s_ease] hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,46,99,0.7)] bg-[#FF2E63]' onClick={() => navigate('/focusmode')}>Start Focus</button>
          </div>
        </div>
    </div>
  )
}

export default Home