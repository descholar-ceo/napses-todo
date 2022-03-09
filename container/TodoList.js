import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from '../components/TodoItem';

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    useEffect(async () => {
        try {
            const gottenTodos = await axios.get(`${process.env.NEXT_PUBLIC_API}/todos`);
            setTodos(gottenTodos.data)
        } catch (error) {
            console.log(error);
        }
    }, []);
    const todosElts = todos.map((currTodo, index) => {
        return <div key={index}><TodoItem todo={currTodo} /></div>
    });
    const noTodosYet = <div><p className='text-center text-red-300 text-xl font-extrabold'>No Todos Yet</p></div>
  return (
    <div className='w-1/2 mx-auto p-5'>{(!!todos && todos.length !== 0) ? todosElts : noTodosYet}</div>
  )
}
