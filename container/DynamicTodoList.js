import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TodoList from './TodoList';

export default function DynamicTodoList() {
  const router = useRouter();
    const [todos, setTodos] = useState([]);
    useEffect(async () => {
      try {
        const gottenTodos = await axios.get(`${process.env.NEXT_PUBLIC_API}/todos?status=${router.query.status}`);
        setTodos(gottenTodos.data);
    } catch (error) {
        console.log({ error });
    }
    })
  return (
    <div><TodoList listOfTodos={todos}/></div>
  )
}
