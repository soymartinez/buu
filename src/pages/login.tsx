import Logo from 'components/logo'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'

export default function Signin() {
    return (
        <div className='w-screen h-screen grid lg:grid-cols-2'>
            <Head>
                <title>Buu – Iniciar sesión</title>
            </Head>
            <div className='flex flex-col gap-2 justify-start h-4/6 items-center place-self-center lg:justify-self-end lg:mx-16 xl:mx-24 w-full px-4 sm:p-0 sm:w-[380px]'>
                <div className='flex flex-col justify-center items-center -space-y-2'>
                    <Link href={'/'}>
                        <a>
                            <Logo className='w-20' fill={'#2524D1'} />
                        </a>
                    </Link>
                    <h1 className='font-bold text-xl'>Bienvenido</h1>
                </div>
                <p className='text-font text-xs mb-6'>Por favor, introduzca sus datos.</p>
                <form className='flex flex-col gap-3 w-full'>
                    <input type={'text'} required name={'email'} placeholder={'Correo electrónico'} className='text-xs w-full border rounded-md p-3 hover:border-font' />
                    <button className='w-full bg-primary rounded-md p-2 font-semibold text-white hover:bg-opacity-90 transition-colors' type={'submit'}>Continuar</button>
                </form>
                <div className='flex gap-6 my-3 w-full justify-center items-center'>
                    <p className='h-[2px] w-full bg-gray-200 rounded-full' />
                    <p className='text-font font-bold text-lg'>ó</p>
                    <p className='h-[2px] w-full bg-gray-200 rounded-full' />
                </div>
                <div className='w-full flex flex-col gap-3 text-font text-sm'>
                    <button onClick={() => signIn('google', { callbackUrl: '/' })} className='flex justify-center gap-2 items-center w-full rounded-md p-2 hover:border-font font-semibold border'>
                        <svg width={30} height={30} viewBox={'0 0 256 262'}>
                            <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
                            <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
                            <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
                            <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
                        </svg>
                        Continua con Google
                    </button>
                    <button onClick={() => signIn('github', { callbackUrl: '/' })} className='flex items-center justify-center gap-2 w-full rounded-md p-2 hover:border-font font-semibold border'>
                        <svg width={30} height={30} viewBox={'0 0 32 32'}>
                            <path d='M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z' />
                        </svg>
                        Continua con GitHub
                    </button>
                </div>
            </div>
            <div className='hidden lg:flex flex-col justify-center items-center -space-y-5 bg-primary w-full h-full rounded-l-[10%]'>
                <Logo className='w-36' fill='#fff' />
                <p className='text-white text-xl'><strong>bu</strong>scador de <strong>u</strong>niversidades</p>
            </div>
        </div>
    )
}
