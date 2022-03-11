import React, { useState } from 'react'
import Button from './Button'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { prepareDates } from '../utils/prepare-date';
import classNames from 'classnames';

export default function LoginForm() {
    const [loginSuccess, setLoginSuccess] = useState('');
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const submitData = async (data) => {
        try {
        const gottenUser = await axios.get(`${process.env.NEXT_PUBLIC_API}/users?email=${data.email}&password=${data.password}`);
        if (!!gottenUser && gottenUser.data && gottenUser.data.length !== 0) {
            const { givenDay, nextDay } = prepareDates(new Date().getTime());
            const data = { userId: gottenUser.data[0].id, createdAt: new Date(givenDay), expires: new Date(nextDay) };
            console.log({ data });
            const newSession = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/sessions`,
                data,
                { headers: { 'Content-Type': 'application/json' } },
            );
            if (!!newSession && newSession.data) {
                router.push('/');
            } else {
                return setLoginSuccess('fail');
            }
        } else {
            return setLoginSuccess('fail');
        }
        } catch (error) {
            console.log({ error });
        }
    }
    const loginErrorClass = classNames(
        {'visible': loginSuccess === 'fail'},
        {'invisible': loginSuccess === ''},
    );
    return (
        <div>
            <p className={
                `${loginErrorClass} text-red-600 my-5 bg-red-200 bg-opacity-50 mx-auto rounded-full text-ellipsis text-center text-lg`}>Email or password not matching</p>
            <form onSubmit={handleSubmit(submitData)} className='my-5 w-1/3 mx-auto border-2 p-2 rounded-lg border-slate-600 shadow-xl'>
            <div>
                <input
                type='text'
                placeholder='Enter your email'
                className='p-1 my-1 w-full rounded-md outline-none text-lg bg-slate-300'
                {...register('email')}
                />
            </div>
            <div>
                <input
                type='password'
                placeholder='Enter your password'
                className='p-1 my-1 w-full rounded-md outline-none text-lg bg-slate-300'
                {...register('password')}
                />
            </div>
            <Button handleClick={handleSubmit(submitData)} classes='bg-blue-400 px-2 py-1 rounded-lg my-4' text='Login' />
            </form>
        </div>
      )    
}
