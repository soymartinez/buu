import Logo from 'components/logo'

export default function Signin() {
    return (
        <div className='w-screen h-screen grid lg:grid-cols-2'>
            {/* Buu – Iniciar sesión */}
            <div className='flex flex-col gap-2 justify-start h-4/6 items-center place-self-center lg:justify-self-end lg:mx-16 xl:mx-24 w-full px-4 sm:p-0 sm:w-[380px]'>
                <div className='flex flex-col justify-center items-center -space-y-2'>
                    <Logo className='w-20' fill={'#2524D1'} />
                    <h1 className='font-bold text-xl'>Bienvenido</h1>
                </div>
                <p className='text-font text-xs mb-6'>Por favor, introduzca sus datos.</p>
                <form className='flex flex-col gap-3 w-full'>
                    <input type={'text'} required name={'email'} placeholder={'Correo electrónico'} className='text-xs w-full border rounded-md p-3' />
                    <button className='w-full bg-primary rounded-md px-2 py-2 font-semibold text-white' type={'submit'}>Continuar</button>
                </form>
                <div className='flex gap-6 my-3 w-full justify-center items-center'>
                    <p className='h-[2px] w-full bg-gray-200 rounded-full' />
                    <p className='text-font font-bold text-lg'>ó</p>
                    <p className='h-[2px] w-full bg-gray-200 rounded-full' />
                </div>
                <div className='w-full flex flex-col gap-3 text-font text-sm'>
                    <button className='w-full rounded-md px-2 py-2 font-semibold border'>Continua con Google</button>
                    <button className='w-full rounded-md px-2 py-2 font-semibold border'>Continua con GitHub</button>
                </div>
            </div>
            <div className='hidden lg:flex flex-col justify-center items-center -space-y-5 bg-primary w-full h-full rounded-l-[10%]'>
                <Logo className='w-36' fill='#fff' />
                <p className='text-white text-xl'><strong>bu</strong>scador de <strong>u</strong>niversidades</p>
            </div>
        </div>
    )
}
