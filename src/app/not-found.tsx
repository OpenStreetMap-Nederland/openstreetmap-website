import Link from 'next/link'

export default function FourOhFour() {
  return (
    <div
    className='flex flex-col items-center justify-center h-64 text-4xl text-gray-700 dark:text-gray-300'
    >
      <h1
      className='font-bold text-9xl'
      >404</h1>
      <p>Page not found</p>
    </div>
  )
}