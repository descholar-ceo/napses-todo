import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Button from './Button';
import classNames from 'classnames';

export const Nav = () => {
    const router = useRouter();
    const [session, setSession] = useState([]);
    const [todos, setTodos] = useState([]);
    useEffect(async () => {
        try {
            const mSession = await axios.get(`${process.env.NEXT_PUBLIC_API}/sessions`);
            setSession(mSession.data[0]);
            const mTodos = await axios.get(`${process.env.NEXT_PUBLIC_API}/todos`);
            setTodos(mTodos.data);
        } catch (error) {
            console.log(error);
        }
    }, []);
    const todosNav =
    (!!todos && todos.length !== 0) ?
    <ul className='flex items-center text-green-300 text-lg'>
        <li><Link href='/todos/completed'>Completed todos</Link></li>
        <li className='mx-2'>|</li>
        <li><Link href='/todos/inprogress'>In progress todos</Link></li>
    </ul> : '';
    const loginBtnClasses = classNames(
        {
            'hover:bg-red-100 hover:text-red-600 hover:border-red-600 bg-red-600 text-white' : !!session,
            'hover:bg-blue-100 hover:text-blue-600 hover:border-blue-600 bg-blue-600 text-white': !session
        }
        )
    const handleLogout = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API}/sessions/1`);
        } catch (error) {
            console.log({ error });
        }
    }
  return (
    <nav className='flex justify-between p-5 bg-slate-600 w-full shadow-xl'>
        <div>
            <Link href="/">
                <div className='cursor-pointer text-6xl font-extrabold'>
                    <span className='text-blue-700'>Napses</span>
                    <span className='text-blue-500'>Todos</span>
                </div>
            </Link>
        </div>
        {todosNav}
        <div className='flex items-center'>
            <span className='bg-blue-600 text-white p-3 mx-5 rounded-lg'>
                <Link href='/createTodo'>Create todo</Link>
            </span>
            <Button
                classes={`${loginBtnClasses} outline-none hover:border-2 p-3 mx-5 rounded-lg`}
                text={!!session ? 'Logout' : 'Login'}
                handleClick={handleLogout}
            >
            </Button>
            <span className='hover:border-2 p-3 mx-5 rounded-lg hover:bg-slate-100 hover:text-slate-600 hover:border-slate-600 bg-slate-800 text-white'><Link href="signup">Register</Link></span>
        </div>
    </nav>
  )
}
