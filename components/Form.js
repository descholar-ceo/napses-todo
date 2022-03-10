import React from 'react';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Form() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors }} = useForm();
  const submitData = async (data) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/todos`, data, { headers: { 'Content-Type': 'application/json' }});
      router.push('/');
    } catch (error) {
      console.log({ error });
    }
  }
  return (
    <form onSubmit={handleSubmit(submitData)} className='my-5 w-1/3 mx-auto border-2 p-2 rounded-lg border-slate-600 shadow-xl'>
      <input
        type='text'
        placeholder='eg: todo name'
        className='p-1 my-1 w-full rounded-md outline-none text-lg bg-slate-300'
        {...register('name', { required: true, minLength: '3' })}
      />
      <textarea
        placeholder='eg: todo description'
        className='p-1 my-1 w-full rounded-md outline-none text-lg bg-slate-300'
        {...register('description', { required: true, minLength: 3, maxLength: 200 })}
      ></textarea>
      <input
        className='p-1 my-1 w-full rounded-md outline-none text-lg bg-slate-300'
        type='datetime-local'
        {...register('time', { required: true })}
      />
      <div className='flex my-1 p-2'>
        <div className='mx-2'>
          <label
            htmlFor='completed'
            className='mx-2 cursor-pointer'
          >Completed</label>
          <input
            type='radio'
            name='completed'
            value='true'
            id='completed'
            {...register('completed', { required: true })}
          />
        </div>
        <div className='mx-2'>
          <label
            htmlFor='in-progress'
            className='mx-2 cursor-pointer'
          >In progress</label>
          <input
            id='in-progress'
            type='radio'
            name='completed'
            value='false'
            {...register('completed', { required: true })}
          />
        </div>
      </div>
      <Button handleClick={handleSubmit(submitData)} classes='bg-blue-400 px-2 py-1 rounded-lg my-4' text='Save' />
    </form>
  )
}
