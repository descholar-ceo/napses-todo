import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Napses todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-blue-400 text-white mx-auto'>
        <h1 className='text-center'>This is todo app</h1>
      </main>
    </div>
  )
}
