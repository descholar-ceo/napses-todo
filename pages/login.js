import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!!session && session.id) {
      router.push('/');
    }
  }, [])
  return (
    <div className='h-screen'><LoginForm /></div>
  )
}
