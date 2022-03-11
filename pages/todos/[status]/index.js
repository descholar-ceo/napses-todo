import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import DynamicTodoList from '../../../container/DynamicTodoList';

export default function Todos() {
  const router = useRouter();
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!session || !session.id) {
      router.push('/login');
    }
  }, [])
  return (
    <div className='w-1/2 mx-auto'><DynamicTodoList /></div>
  )
}
