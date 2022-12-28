export default function Loading() {
    return (
        <svg className='animate-spin h-5 w-5 ml-3' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='8' stroke='currentColor' strokeWidth='4' />
            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z' />
        </svg>
    )
}
