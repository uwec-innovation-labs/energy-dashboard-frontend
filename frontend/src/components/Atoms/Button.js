import React from 'react'

function Button({ text, click }) {
    return (
        <>
            <button onClick={click}>{text}</button>
        </>
    )
}

export default Button
