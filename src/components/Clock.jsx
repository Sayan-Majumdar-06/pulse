import React from 'react'
import { useState, useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import fullscreen from '../assets/fullscreen.svg';
import {quotes} from '../assets/quotes.js'
const Clock = () => {

  const [currentTime, setCurrentTime] = useState(new Date());
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const timerID = setInterval( () => {
      setCurrentTime(new Date());
    }, 1000);
  
    return () => {
      clearInterval(timerID);
    }
  }, [])

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);
  
  const hours = (currentTime.getHours() < 10)? '0'+currentTime.getHours() : currentTime.getHours();
  const minutes = (currentTime.getMinutes() < 10)? '0'+currentTime.getMinutes() : currentTime.getMinutes();

  const handle = useFullScreenHandle();

  return (
    <FullScreen handle={ handle }>
      <div className={handle.active? 'w-full h-screen clock-bg flex flex-col items-center gap-[6rem] py-[1rem] font-outfit':'w-full h-screen clock-bg font-outfit'}>

        <div className='py-[3rem] px-[2rem] sm:px-[5rem] w-full flex justify-between mb-[4rem] gap-1 text-white'>
          <h1 className='text-3xl sm:text-5xl'>Pulse</h1>

          <p className='text-end text-lg sm:text-2xl w-[400px]'>{quote}</p>
        </div>

        <div className='flex justify-center items-center w-fit mx-auto p-4 sm:p-12 h-[200px] gap-1 sm:gap-4 tabular-nums font-montserrat'>
          <h1 className={handle.active?'text-[6rem] sm:text-[12rem] lg:text-[16rem] font-extrabold text-[#ff2e628d]':'text-[6rem] sm:text-[10rem] lg:text-[14rem] font-extrabold text-[#ff2e628d]'} style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)'}}>{ hours }</h1>
          <h1  className='text-[6rem] sm:text-[10rem] lg:text-[14rem] font-bold text-[#ff2e62be] pulse' style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>:</h1>
          <h1 className={handle.active?'text-[6rem] sm:text-[12rem] lg:text-[16rem] font-extrabold text-[#ff2e628d]':'text-[6rem] sm:text-[10rem] lg:text-[14rem] font-extrabold text-[#ff2e628d]'}  style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)'}}>{ minutes }</h1>
        </div>

        <div className={handle.active? 'hidden' : 'w-full flex justify-center sm:p-8'}>
          <button className='text-white p-3 rounded-lg flex gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,46,99,0.4)] transition-[all_0.25s_ease] hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,46,99,0.7)] bg-[#ff2e62b4]' onClick={handle.enter}>
            <img src={fullscreen} alt=''></img>
            <p>Fullscreen</p>
          </button>
        </div>

      </div>
    </FullScreen>
  )
}

export default Clock