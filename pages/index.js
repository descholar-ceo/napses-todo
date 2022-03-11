import { useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import TodoList from '../container/TodoList'

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!session || !session.id) {
      router.push('/login');
    }
  }, [])
  return (
    <div>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Napses todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='w-1/2 mx-auto'>
        <TodoList />
      </main>
    </div>
  )
}
