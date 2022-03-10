import MainLayout from '../container/MainLayout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<div className='bg-slate-500 h-full pb-5'><MainLayout><Component {...pageProps} /></MainLayout></div>)
}

export default MyApp
