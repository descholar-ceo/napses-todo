import React from 'react';
import Button from './Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function SignupForm() {
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
  console.log({ errors });
  return (
    <form onSubmit={handleSubmit(submitData)} className='my-5 w-1/3 mx-auto border-2 p-2 rounded-lg border-slate-600 shadow-xl'>
      <div>
        <input
          type='text'
          placeholder='Enter your name'
          className='p-1 my-1 w-full rounded-md outline-none text-lg bg-slate-300'
          {...register('name', { required: true, minLength: '3' })}
        />
        <p className='text-sm text-red-800 text-center'>{errors.name?.type === 'required' && 'name is required' }</p>
        <p className='text-sm text-red-800 text-center'>{errors.name?.type === 'minLength' && 'minLength should be 3' }</p>
      </div>
      <div>
        <input
          type='tel'
          placeholder='Enter your phone number here'
          className='p-1 my-1 w-full rounded-md outline-none text-lg bg-slate-300'
          {...register('mobile', { required: true })}
        />
        <p className='text-sm text-red-800 text-center'>{errors.mobile?.type === 'required' && 'phone number is required' }</p>
      </div>
      <div className='flex justify-between items-center'>
        <p>Gender:</p>
        <div className='flex my-1 p-2'>
          <div className='mx-2'>
            <label
              htmlFor='gender'
              className='mx-2 cursor-pointer'
            >Female</label>
            <input
              type='radio'
              name='gender'
              value='Female'
              id='gender'
              {...register('gender', { required: true })}
            />
          </div>
          <div className='mx-2'>
            <label
              htmlFor='m'
              className='mx-2 cursor-pointer'
            >Male</label>
            <input
              id='m'
              type='radio'
              name='gender'
              value='Male'
              {...register('gender', { required: true })}
            />
          </div>
        </div>
      </div>
      <p className='text-sm text-red-800 text-center'>{errors.gender?.type === 'required' && 'gender is required' }</p>
      <div>
        <select
          name="country"
          className='p-1 my-1 w-full rounded-md outline-none text-lg bg-slate-300'
          {...register('country', { required: true })}
        >
          <option value="">---Select your country---</option>
          <option value="India">India</option>
          <option value="US">US</option>
          <option value="Rwanda">Rwanda</option>
          <option value="SriLanka">SriLanka</option>
          <option value="Japan">Japan</option>
        </select>
        <p className='text-sm text-red-800 text-center'>{errors.country?.type === 'required' && 'country is required' }</p>
      </div>
      <div>
        <div className='flex justify-between'>
          <div>Hobbies:</div>
          <div className='flex'>
            <div className='mx-3'>
              <label className='mx-1' htmlFor='Music'>Music</label>
              <input className='mx-1' type='checkbox' name='hobbies' id='Music' value='Music' />
            </div>
            <div className='mx-3'>
              <label className='mx-1' htmlFor='Sport'>Sport</label>
              <input className='mx-1' type='checkbox' name='hobbies' id='Sport' value='Sport' />
            </div>
            <div className='mx-3'>
              <label className='mx-1' htmlFor='Movies'>Movies</label>
              <input className='mx-1' type='checkbox' name='hobbies' id='Movies' value='Movies' />
            </div>
            <div className='mx-3'>
              <label className='mx-1' htmlFor='Coding'>Coding</label>
              <input className='mx-1' type='checkbox' name='hobbies' id='Coding' value='Coding' />
            </div>
          </div>
        </div>
        <p className='text-sm text-red-800 text-center'>{errors.country?.type === 'required' && 'country is required' }</p>
      </div>
      <Button handleClick={handleSubmit(submitData)} classes='bg-blue-400 px-2 py-1 rounded-lg my-4' text='Save' />
    </form>
  )
}
