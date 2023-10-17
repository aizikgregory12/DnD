import React from 'react'

export default function Identifier({ label, value, id, numberID }) {
    return (
        <div className='identifier' id={id}>
            <h2 className='label'>
                {label}
            </h2>
            <h2 className='value' id={numberID}>
                {value}
            </h2>
        </div>
    )
}