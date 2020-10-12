import React from 'react'

function IconButton({ Icon, isDisabled }) {
    return (
        <>
            <div className={isDisabled ? "icon-disabled" : "icon"}>
                <center>
                    <Icon fontSize="large" style={{ fill: "white" }} />
                </center>
            </div>
        </>
    )
}

export default IconButton
