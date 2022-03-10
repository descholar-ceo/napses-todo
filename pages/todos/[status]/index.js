import React from 'react';
import { useRouter } from 'next/router';
import DynamicTodoList from '../../../container/DynamicTodoList';

export default function Todos() {
    const router = useRouter();
    const { status } = router.query;
  return (
    <div><DynamicTodoList status={status}/></div>
  )
}
