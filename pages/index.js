import Head from 'next/head'
import TodoList from '../container/TodoList'

export default function Home() {
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
