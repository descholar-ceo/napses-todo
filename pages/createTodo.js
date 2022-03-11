import { useRouter } from 'next/router';
import React, { useEffect} from 'react';
import CreateTodoForm from '../components/CreateTodoForm';

export default function CreateTodo() {
  const router = useRouter();
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!session || !session.id) {
      router.push('/login');
    }
  }, [])
  return (
    <div><CreateTodoForm /></div>
  )
}
