import axios from 'axios';
import classNames from 'classnames'
import React from 'react'
import Button from './Button'

export default function TodoItem({ todo }) {
    const cardClasses = classNames(
        'p-5',
        'm-5',
        {
            'bg-blue-800' : todo.completed,
            'bg-red-800' : !todo.completed
        },
        'bg-opacity-30',
        'rounded-lg',
        'shadow-xl',
        'cursor-pointer'
    );
    const statusBtnClass = classNames(
        {
            'bg-yellow-200': !todo.completed,
            'bg-green-200': todo.completed,
        },
        'px-3',
        'py-1',
        'rounded-md'
    );
    const handleCompleted = async () => {
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_API}/todos/${todo.id}`, { completed: !todo.completed }, { headers: { 'Content-Type': 'application/json'}});
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
        <h1 className='text-center text-3xl text-blue-200 font-extrabold pb-5 pt-2'>{todo.name}</h1>
        <p className='text-xl my-4'>{todo.description}</p>
        <p className='text-sm'>{todo.time}</p>
        <footer className='flex justify-end p-3'>
            <span className='inline-block mx-2'>
                <Button handleClick={handleCompleted} classes={statusBtnClass} text={todo.completed ? 'Completed' : 'Complete'} />
            </span>
            <span className='inline-block mx-2'>
                <Button classes='bg-blue-200 px-3 py-1 rounded-md' text='Edit' />
            </span>
            <span className='inline-block mx-2'>
                <Button handleClick={handleDelete} classes='bg-red-200 px-3 py-1 rounded-md' text='Delete' />
            </span>
        </footer>
    </div>
  )
}
