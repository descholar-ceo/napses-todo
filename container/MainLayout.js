import React from 'react'
import { Nav } from '../components/Nav'

export default function MainLayout({ children }) {
  return (
    <div className=' bg-slate-500'>
        <Nav/>
        {children}
    </div>
    
  )
}
