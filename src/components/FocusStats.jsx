import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const FocusStats = () => {

  const focusData = useSelector((state) => state.stats.session);
  const breakData = useSelector((state) => state.stats.break);

  const [focusStats, setFocusStats] = useState(0);
  const [sessionStats, setSessionStats] = useState(0);
  const [breakStats, setBreakStats] = useState(0);

  const [isTodayActive, setIsTodayActive] = useState(true);
  const [isWeekActive, setIsWeekActive] = useState(false);
  const [isAllActive, setIsAllActive] = useState(false);

  function sortByToday() {
    setIsTodayActive(true);
    setIsWeekActive(false);
    setIsAllActive(false);

    const today = new Date().toDateString();

    let session_cnt = 0;
    let focusTime = 0;
    let breakTime = 0;

    for(let i = 0; i < focusData.length; i++) {
      let date = new Date(focusData[i].date).toDateString();
      if(date === today) {
        session_cnt++;
        focusTime += focusData[i].duration;
      }
    }

    for(let i = 0; i < breakData.length; i++) {
      if(breakData[i].date === today) {
        breakTime += breakData[i].duration;
      }
    }

    setFocusStats(focusTime);
    setSessionStats(session_cnt);
    setBreakStats(breakTime);
  }

  function sortByWeek() {
    setIsTodayActive(false);
    setIsWeekActive(true);
    setIsAllActive(false);

    const today = new Date()
    const dateBefore = new Date(today);

    dateBefore.setDate(today.getDate() - 7);

    let session_cnt = 0;
    let focusTime = 0;
    let breakTime= 0;

    for(let i = 0; i < focusData.length; i++) {
      let date = new Date(focusData[i].date);
      if(date > dateBefore && date <= today) {
        session_cnt++;
        focusTime += focusData[i].duration;
      }
    }

    for(let i = 0; i < breakData.length; i++) {
      if(new Date(breakData[i].date) > dateBefore && new Date(breakData[i].date) <= today) {
        breakTime += breakData[i].duration;
      }
    }

    setSessionStats(session_cnt);
    setFocusStats(focusTime);
    setBreakStats(breakTime);
  }

  function sortByAllTime() {
    setIsTodayActive(false);
    setIsWeekActive(false);
    setIsAllActive(true);

    let session_cnt = 0;
    let focusTime = 0;
    let breakTime = 0;

    for(let i = 0; i < focusData.length; i++) {
        session_cnt++;
        focusTime += focusData[i].duration;
    }

    for(let i = 0; i < breakData.length; i++) {
        breakTime += breakData[i].duration;
    }

    setSessionStats(session_cnt);
    setFocusStats(focusTime);
    setBreakStats(breakTime);
  }
  
  useEffect(()=> {
    sortByToday();
  }, []);
  
  return (
    <div className='w-full h-screen stats-bg font-outfit'>

        <div className='mx-auto p-8 pt-0 flex text-white'>
          <div className='w-full lg:w-1/2 flex flex-col gap-2 p-4 pt-8'>
            <div className='mb-8 space-y-3'>
              <h1 className='text-5xl font-bold'>Focus Stats</h1>

              <p className='text-xl'>
                Monitor your progress over time, celebrate your focus streaks, and turn your deep work sessions into a lasting habit.
              </p> 
            </div>

            <div className='w-full flex gap-2 flex-wrap sm:gap-8'>
              <div className={`px-2 sm:px-4 py-2 rounded-xl cursor-pointer ${isTodayActive?'shadow-[0_0_15px_rgba(8,217,214,0.4)] transition-[all_0.25s_ease] hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(8,217,214,0.7)] bg-[#08d9d6] text-[#1e1e24]':'border-2'}`} onClick={ sortByToday }>Today</div>
              <div className={`px-2 sm:px-4 py-2 rounded-xl cursor-pointer  ${isWeekActive?'shadow-[0_0_15px_rgba(8,217,214,0.4)] transition-[all_0.25s_ease] hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(8,217,214,0.7)] bg-[#08d9d6] text-[#1e1e24]':'border-2'}`} onClick={ sortByWeek }>1 Week</div>
              <div className={`px-2 sm:px-4 py-2 rounded-xl cursor-pointer ${isAllActive?'shadow-[0_0_15px_rgba(8,217,214,0.4)] transition-[all_0.25s_ease] hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(8,217,214,0.7)] bg-[#08d9d6] text-[#1e1e24]':'border-2'}`} onClick={ sortByAllTime }>All time</div>
            </div>

            <div className='w-3/4 p-8 pl-0 grid grid-cols-1 sm:grid-cols-2 gap-2 gsm:ap-8'>
              <div className='h-[80px] sm:h-[150px] p-2 sm:p-4 rounded-xl bg-[#ff2e62d7]'> 
                <h1 className='font-bold text-xl sm:text-2xl'>Focus Time</h1>
                <p className='font-medium text-lg'> {Math.floor(focusStats/60)} hrs {focusStats%60} mins</p>
              </div>
              <div className='h-[80px] sm:h-[150px] p-2 sm:p-4 rounded-xl bg-[#ff2e62d7]'>
                <h1 className='font-bold text-xl sm:text-2xl'> Sessions </h1>
                <p className='font-medium text-lg'> {sessionStats}</p>
              </div>
              <div className='h-[80px] sm:h-[150px] p-2 sm:p-4 rounded-xl bg-[#ff2e62d7]'>
                <h1 className='font-bold text-xl sm:text-2xl'> Break Time </h1>
                <p className='font-medium text-lg'>{Math.floor(breakStats/60)} hrs {breakStats%60} mins</p>
              </div>
              
            </div>

          </div>

          <div className='hidden lg:flex justify-center items-center w-1/2'>
            <div className="pulse-loader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FocusStats