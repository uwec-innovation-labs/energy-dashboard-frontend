import React from 'react'

function IconButton({ Icon, isDisabled, handleEnergyChange, type, whatSelected }) {
    return (
        <>
            <div className={isDisabled ? "icon-disabled" : (whatSelected === type ? "icon-selected" : "icon")} onClick={() => isDisabled ? '' : handleEnergyChange(type)}>
                <center>
                    <Icon fontSize="large" style={{ fill: "white" }} />
                </center>
            </div>
        </>
    )
}

export default IconButton
