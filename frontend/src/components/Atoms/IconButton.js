import React from 'react'

function IconButton({ Icon, isDisabled, handleEnergyChange, type }) {
    return (
        <>
            <div className={isDisabled ? "icon-disabled" : "icon"} onClick={() => isDisabled ? '' : handleEnergyChange(type)}>
                <center>
                    <Icon fontSize="large" style={{ fill: "white" }} />
                </center>
            </div>
        </>
    )
}

export default IconButton
