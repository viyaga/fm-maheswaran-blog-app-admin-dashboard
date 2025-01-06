import React from 'react'

const ServerError = ({ message }) => {
    return (
        <p className='mt-10 text-center'>
            {message}
        </p>
    )
}

export default ServerError
