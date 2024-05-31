import React from 'react'

const HintBox = ({ dir, hint, hintOff, children }) => {
    return (
        <div className='hint-box'>
            {children}
            {!hintOff && <div className={`hint-box-content-hint ${dir}`}>
                {hint}
            </div>}

        </div>
    )
}

export default HintBox