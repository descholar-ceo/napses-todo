import React from 'react'
import { Nav } from '../components/Nav'

export default function MainLayout({ children }) {
  return (
    <div className=' bg-slate-500 h-full pb-5'>
        <Nav/>
        {children}
    </div>
    
  )
}
