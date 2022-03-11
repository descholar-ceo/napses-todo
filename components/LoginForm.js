import React, { useState } from 'react'
import Button from './Button'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import axios from 'axios';

export default function LoginForm() {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const submitData = async (data) => {
        try {
        const gottenUser = await axios.get(`${process.env.NEXT_PUBLIC_API}/users?email=${data.email}&password=${data.password}`);
        if (!!gottenUser && gottenUser.length !== 0) {
            const toDay = new Date();
            const newSession = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/sessions`,
                { userId: gottenUser.id, createdAt: new Date(), epires: new Date() + 1});
        }
        // router.push('/login');
        } catch (error) {
        console.log({ error });
        }
    }
    return (
        <div>
            <p className='text-red-600 my-5 bg-red-200 bg-opacity-50 mx-auto rounded-full text-ellipsis text-center text-lg'>Email or password not matching</p>
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
