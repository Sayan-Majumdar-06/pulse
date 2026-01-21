import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='w-full bg-[#1E1E24] font-outfit text-white'>
        <div className='w-[95%] sm:w-3/4 flex justify-between items-center mx-auto p-4'>
            <h1 className='text-3xl'><NavLink to='/'>Pulse</NavLink></h1>
            <div className='flex gap-12'>
                <div className='relative inline-block group'>
                    <button className='border-none'>Features</button>
                    <div className='bg-[#1E1E24] hidden z-1 absolute min-w-40 group-hover:flex group-hover:flex-col'>
                        <NavLink to="/clock" className='p-2 hover:bg-[#494951] cursor-pointer'>Clock</NavLink>
                        <NavLink to="/focusmode" className='p-2 hover:bg-[#494951] cursor-pointer'>Focus Mode</NavLink>
                        <NavLink to="https://snippits-chi.vercel.app/" target='_blank' className='p-2 hover:bg-[#494951] cursor-pointer'>Try Snippits</NavLink>
                    </div>
                </div>
                                 
                <NavLink to={'/about'}>
                    About
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default NavBar