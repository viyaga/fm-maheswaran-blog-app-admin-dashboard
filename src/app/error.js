'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
    console.log({ errorRespose: error });

    useEffect(() => {
        console.error({error});
        
        // Log the error to an error reporting service
    }, [error])

    return (
        <div className='flex flex-col justify-center items-center h-[100vh]'>
            <h2>Something went wrong!</h2>
            <p> {error.error}</p>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}