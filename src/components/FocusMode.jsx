import { useEffect } from 'react'
import { useState } from 'react'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useNavigate } from 'react-router-dom';
import edit from '../assets/edit.svg';
import fullscreen from '../assets/fullscreen.svg';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateBreakStats, updateFocusStats } from '../redux/StatsSlice'
// import useSound from 'use-sound';
// import successSfx from '../assets/success.wav';
import {quotes} from '../assets/quotes.js'
import { useRef } from 'react';

const FocusMode = () => {
  const [taskText, setTasktext] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const [timerVal, setTimerVal] = useState(25);
  
  const [minutes, setMinutes] = useState(timerVal);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timerVal*60*1000);

  const [isFocus, setIsFocus] = useState(true);
  const [isShortBreak, setIsShortBreak] = useState(false);
  const [isLongBreak, setIsLongBreak] = useState(false);

  const [quote, setQuote] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [play] = useSound(successSfx);

  function startTimer() {
    setIsActive(true);
  }

  function stopTimer() {
    setIsActive(false);
  }

  // timer logic
  useEffect(() => {
    let timerId = null;

    if(isActive && remainingTime > 0) {
      timerId = setInterval(()=>{
        setRemainingTime(remainingTime => remainingTime - 1000);
      }, 1000);
    } else if (!isActive || remainingTime <= 0) {
      if(remainingTime===0) {

        if(isFocus) toast.success('Focus session completed');
        else toast.success('Break session completed');
      }
      setIsActive(false);
      setRemainingTime(timerVal * 60 * 1000);
    }

    return () => {
      clearInterval(timerId);
    }

  }, [isActive, remainingTime, timerVal])

  useEffect(() => {
    if(remainingTime === 0) {
      if(isFocus) {
        console.log("focus added");
        dispatch(updateFocusStats({
          duration: timerVal,
          date: new Date().toISOString(),
        }));
      } 
      
      else {
        console.log("break added");
        dispatch(updateBreakStats({
          duration: timerVal,
          date: new Date().toISOString(),
        }));
      }
    }
    
  }, [isFocus, remainingTime])
  
  

  useEffect(() => {
    setMinutes(Math.floor(remainingTime / (1000*60)));
    setSeconds(Math.floor((remainingTime % (1000*60)) / 1000));
  }, [remainingTime])
  
  const handleModeChange = (newDuration) => {
    setTimerVal(newDuration);
    setRemainingTime(newDuration * 60 * 1000);
    setIsActive(false);
  };

  function toggleDisabledState() {
    setIsDisabled(false);
  };

  const inputRef = useRef(null);

  const handleClick = () => {
    toggleDisabledState();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  const handleKeyEnter = (e) => {
    if(e.key === 'Enter'){
      setIsDisabled(true);
    }
  }

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);
  

  const handle = useFullScreenHandle();

  return (
    <FullScreen handle={ handle }>
      <div className={handle.active? 'w-full h-screen focus-bg flex flex-col items-center gap-[6rem] py-[1rem] font-outfit':'w-full h-screen focus-bg font-outfit'}>

        {/* Header */}
        <div className='pt-[3rem] px-[1rem] sm:px-[5rem] w-full flex justify-between text-white'>
          <h1 className='text-3xl sm:text-5xl'>Pulse</h1>

          <p className='text-end text-lg sm:text-xl md:text-2xl w-[200px] md:w-[400px]'>{quote}</p>
        </div>

        {/* Timer Component */}
        <div className='w-fit mx-auto p-4 sm:p-12 h-[200px] text-white mt-[2rem] sm:mt-0'>

          {/* Task and Timer type controls */}
          <div className='w-full flex items-center flex-col gap-4'>
            <div className='flex w-full'>
              <input 
                ref={inputRef} 
                type="text" 
                className={`w-full bg-transparent text-center text-xl text-white placeholder-gray-500 ${handle.active?'':'border-b-2'} border-white/10 focus:border-[#FF2E63] outline-none pb-2 transition-colors`} 
                
                value={taskText} 
                disabled={isDisabled} 
                onChange={(e)=>{setTasktext(e.target.value)}} 
                onKeyDown={handleKeyEnter} 
                placeholder={handle.active ? ' ':'What are you working on?'}
              />

              <button className={handle.active? 'hidden':'block p-2  cursor-pointer'} onClick={handleClick}>
                <img src={edit} alt="" />
              </button>
            </div>

            <div className='w-fit sm:w-full flex gap-2 sm:justify-around items-center relative z-50 flex-wrap'>

              <button className={handle.active || isActive?'hidden':`px-4 py-2 rounded-xl cursor-pointer ${isFocus?'shadow-[0_0_15px_rgba(8,217,214,0.4)] transition-[all_0.25s_ease] hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(8,217,214,0.7)] bg-[#08d9d6] text-[#1e1e24]':'border-2'}`} onClick={()=>{handleModeChange(25); setIsFocus(true); setIsLongBreak(false); setIsShortBreak(false)}}>Focus</button>

              <button className={handle.active || isActive?'hidden':`px-4 py-2 rounded-xl cursor-pointer ${isShortBreak?'shadow-[0_0_15px_rgba(8,217,214,0.4)] transition-[all_0.25s_ease] hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(8,217,214,0.7)] bg-[#08d9d6] text-[#1e1e24]':'border-2'}`} onClick={()=>{handleModeChange(5); setIsFocus(false); setIsLongBreak(false); setIsShortBreak(true)}}>Short Break</button>

              <button className={handle.active || isActive?'hidden':`px-4 py-2 rounded-xl cursor-pointer ${isLongBreak?'shadow-[0_0_15px_rgba(8,217,214,0.4)] transition-[all_0.25s_ease] hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(8,217,214,0.7)] bg-[#08d9d6] text-[#1e1e24]':'border-2'}`} onClick={()=>{handleModeChange(10); setIsFocus(false); setIsShortBreak(false); setIsLongBreak(true)}}>Long Break</button>
            </div>
          </div>

          {/* Timer */}

          <div className='flex justify-center items-center mt-2 md:-mt-6 tabular-nums font-montserrat'>
            <h1 className={`${handle.active?'text-[7rem] md:text-[14rem]':'text-[5rem] md:text-[10rem]'} font-bold`}>{minutes<10?'0'+minutes:minutes}</h1>
            <h1  className={`${handle.active?'text-[7rem] md:text-[14rem]':'text-[5rem] md:text-[10rem]'} font-bold ${isActive?'pulse':''}`}>:</h1>
            <h1 className={`${handle.active?'text-[7rem] md:text-[14rem]':'text-[5rem] md:text-[10rem]'} font-bold`}>{seconds<10?'0'+seconds:seconds}</h1>
          </div>

          {/* Timer controls */}
          <div className='w-fit mx-auto flex items-center gap-4 sm:gap-8 flex-wrap'>
            <button className={`${isActive?'hidden':'block px-3 sm:px-5 py-3 rounded-xl cursor-pointer shadow-[0_0_15px_rgba(255,46,99,0.4)] transition-[all_0.25s_ease] hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,46,99,0.7)] bg-[#FF2E63]'}`} onClick={startTimer}>Start</button>

            <button className={`${!isActive? 'hidden': 'block px-5 py-3 rounded-xl cursor-pointer shadow-[0_0_15px_rgba(255,46,99,0.4)] transition-[all_0.25s_ease] hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,46,99,0.7)] bg-[#FF2E63]'}`} onClick={stopTimer}>Reset</button>

            <button className={handle.active? 'hidden':'p-3 rounded-xl flex gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,46,99,0.4)] transition-[all_0.25s_ease] hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,46,99,0.7)] bg-[#ff2e62cd]'} onClick={handle.enter}>
               <img src={fullscreen} alt=''></img> Fullscreen
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className={handle.active ?'hidden' :'mt-[16rem] p-4 w-full flex justify-end text-white'}>
          <button className='px-4 py-2 rounded-xl mr-[2rem] cursor-pointer shadow-[0_0_15px_rgba(255,46,99,0.4)] transition-[all_0.25s_ease] hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(255,46,99,0.7)] bg-[#FF2E63]' onClick={() => navigate('/focusmode/stats')}>Focus Stats</button>
        </div>
        
      </div>
    </FullScreen>
  )
}

export default FocusMode