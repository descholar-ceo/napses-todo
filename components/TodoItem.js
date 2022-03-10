import axios from 'axios';
import classNames from 'classnames'
import React, { useState } from 'react'
import Button from './Button'

export default function TodoItem({ todo }) {
    const [gottenTodo,setGottenTodo] = useState(todo);
    const cardClasses = classNames(
        'p-5',
        'm-5',
        {
            'bg-blue-800' : gottenTodo.completed,
            'bg-red-800' : !gottenTodo.completed
        },
        'bg-opacity-30',
        'rounded-lg',
        'shadow-xl',
        'cursor-pointer'
    );
    const statusBtnClass = classNames(
        {
            'bg-yellow-200': !gottenTodo.completed,
            'bg-green-200': gottenTodo.completed,
        },
        'px-3',
        'py-1',
        'rounded-md'
    );
    const handleCompleted = async () => {
        try {
            const updatedTodo = await axios.patch(`${process.env.NEXT_PUBLIC_API}/todos/${todo.id}`, { completed: !todo.completed }, { headers: { 'Content-Type': 'application/json'}});
            setGottenTodo(updatedTodo.data);
        } catch (error) {
            
        }
    }
    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API}/todos/${todo.id}`);
        } catch (error) {
            
        }
    }
  return (
    <div className={cardClasses}>
        <h1 className='text-center text-3xl text-blue-200 font-extrabold pb-5 pt-2'>{gottenTodo.name}</h1>
        <p className='text-xl my-4'>{gottenTodo.description}</p>
        <p className='text-sm'>{gottenTodo.time}</p>
        <footer className='flex justify-end p-3'>
            <span className='inline-block mx-2'>
                <Button handleClick={handleCompleted} classes={statusBtnClass} text={gottenTodo.completed ? 'Completed' : 'Complete'} />
            </span>
            <span className='inline-block mx-2'>
                <Button handleClick={handleDelete} classes='bg-red-200 px-3 py-1 rounded-md' text='Delete' />
            </span>
        </footer>
    </div>
  )
}
