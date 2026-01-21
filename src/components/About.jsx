import React from 'react'
import { useNavigate } from 'react-router-dom'

import html from '../assets/html.svg';
import css from '../assets/css.svg';
import tailwind from '../assets/tailwind.svg';
import react from '../assets/react.svg';
import redux from '../assets/redux.svg';
import vite from '../assets/vite.svg';
import googlefont from '../assets/googlefonts.svg';
const About = () => {
    const navigate = useNavigate();
  return (
    <div className='w-full h-screen about-bg flex justify-center items-center font-outfit text-white'>
        <div className='flex flex-col gap-2 sm:gap-8 w-4/5'>
            <h1 className='text-3xl sm:text-5xl lg:text-7xl mb-4 font-bold'>About Pulse</h1>

            <p className='text-lg sm:text-2xl opacity-80'>
            Pulse is a simple focus and productivity app built to help you stay present during work sessions.
            </p>

            <p className='text-lg sm:text-2xl opacity-60'>
            It combines a distraction-free focus timer with basic session statistics to give clarity on how your time is spent - without overwhelming features or unncessary complexity.
            </p>
        
            <div className='text-lg sm:text-2xl bg-[#0000004d] p-4 rounded-xl w-fit'>
                Built with : 
                <div className='mt-2 flex gap-1 sm:gap-2 flex-wrap'>
                    <img className='h-[1rem] sm:h-[2rem] w-[1rem] sm:w-[2rem]' src={html} alt="" />
                    <img className='h-[1rem] sm:h-[2rem] w-[1rem] sm:w-[2rem]' src={css} alt="" />
                    <img className='h-[1rem] sm:h-[2rem] w-[1rem] sm:w-[2rem]' src={tailwind} alt="" />
                    <img className='h-[1rem] sm:h-[2rem] w-[1rem] sm:w-[2rem]' src={react} alt="" />
                    <img className='h-[1rem] sm:h-[2rem] w-[1rem] sm:w-[2rem]' src={vite} alt="" />
                    <img className='h-[1rem] sm:h-[2rem] w-[1rem] sm:w-[2rem]' src={redux} alt="" />
                    <img className='h-[1rem] sm:h-[2rem]' src={googlefont} alt="" />
                </div>
            </div> 

            <div className='flex items-center justify-between'>
            <p className='text-xl sm:text-2xl opacity-80'>Check out the code <span className='hover:opacity-100 underline'><a href="">here.</a></span></p>
            <button className='px-3 sm:px-8 py-2 sm:py-4 rounded-xl cursor-pointer shadow-[0_0_15px_rgba(8,217,214,0.4)] transition-[all_0.25s_ease] hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(8,217,214,0.7)] bg-[#08d9d6] text-[#1e1e24]' onClick={() => navigate('/')}>Home</button>
            </div>
        </div>
    </div>
  )
}

export default About