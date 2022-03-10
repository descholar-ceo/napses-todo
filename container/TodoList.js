import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from '../components/TodoItem';

export default function TodoList({ listOfTodos }) {
    const [todos, setTodos] = useState([]);
    useEffect(async () => {
        try {
            const gottenTodos = !!listOfTodos ? listOfTodos : await axios.get(`${process.env.NEXT_PUBLIC_API}/todos`);
            setTodos(gottenTodos.data || gottenTodos)
        } catch (error) {
            console.log(error);
        }
    }, [listOfTodos]);
    const noTodosYet = <div><p className='text-center text-red-300 text-xl font-extrabold'>No Todos Yet</p></div>
    const todosElts = (!!todos && todos.length !== 0) ? todos.map((currTodo, index) => {
        return <div key={index}><TodoItem todo={currTodo} /></div>
    }) : noTodosYet;
  return (
    <div className='mx-auto p-5'>{ todosElts }</div>
  )
}
