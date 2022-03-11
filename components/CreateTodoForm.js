import React from 'react';
import Button from './Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function CreateTodoForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }} = useForm();
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
      <p className='text-sm text-red-800 text-center'>{errors.name?.type === 'required' && 'name is required' }</p>
      <p className='text-sm text-red-800 text-center'>{errors.name?.type === 'minLength' && 'minLength should be 3' }</p>
      <textarea
        placeholder='eg: todo description'
        className='p-1 my-1 w-full rounded-md outline-none text-lg bg-slate-300'
        {...register('description', { required: true, minLength: 3, maxLength: 200 })}
      ></textarea>
      <p className='text-sm text-red-800 text-center'>{errors.description?.type === 'required' && 'description is required' }</p>
      <p className='text-sm text-red-800 text-center'>{errors.description?.type === 'minLength' && 'minLength should be 3' }</p>
      <p className='text-sm text-red-800 text-center'>{errors.description?.type === 'maxLength' && 'maxLength should be 200 characters' }</p>
      <input
        className='p-1 my-1 w-full rounded-md outline-none text-lg bg-slate-300'
        type='datetime-local'
        {...register('time', { required: true })}
      />
      <p className='text-sm text-red-800 text-center'>{errors.time?.type === 'required' && 'time is required' }</p>
      <div className='flex my-1 p-2'>
        <div className='mx-2'>
          <label
            htmlFor='completed'
            className='mx-2 cursor-pointer'
          >Completed</label>
          <input
            type='radio'
            name='status'
            value='completed'
            id='completed'
            {...register('status', { required: true })}
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
            name='status'
            value='inprogress'
            {...register('status', { required: true })}
          />
        </div>
      </div>
      <p className='text-sm text-red-800 text-center'>{errors.completed?.type === 'required' && 'completed is required' }</p>
      <Button handleClick={handleSubmit(submitData)} classes='bg-blue-400 px-2 py-1 rounded-lg my-4' text='Save' />
    </form>
  )
}
