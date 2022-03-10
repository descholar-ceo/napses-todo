import React from 'react';
import { useRouter } from 'next/router';
import DynamicTodoList from '../../../container/DynamicTodoList';

export default function Todos() {
  return (
    <div className='w-1/2 mx-auto'><DynamicTodoList /></div>
  )
}
