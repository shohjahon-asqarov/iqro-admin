import React from 'react'

const Loader = () => {
    return (
        <div className='fixed h-screen w-screen top-0 right-0 bottom-0 left-0 flex justify-center items-center !m-0 loader-wrapper'>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader