import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Button from './Button';
import classNames from 'classnames';

export const Nav = () => {
    const router = useRouter();
    const [session, setSession] = useState([]);
    useEffect(async () => {
        try {
            const mSession = await axios.get(`${process.env.NEXT_PUBLIC_API}/sessions`);
            setSession(mSession.data[0]);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const loginBtnClasses = classNames(
        'outline-none',
        'hover:border-2',
        'p-3 mx-5',
        'rounded-lg',
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
    const handleCreate = () => {
        router.push('/createTodo');
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
        <div className='flex items-center'>
            <Button
                classes='bg-blue-600 text-white p-3 mx-5 rounded-lg'
                text='Create a todo'
                handleClick={handleCreate}
            />
            <Button
                classes={loginBtnClasses}
                text={!!session ? 'Logout' : 'Login'}
                handleClick={handleLogout}
            >
            </Button>
        </div>
    </nav>
  )
}
