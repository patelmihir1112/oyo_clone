import Image from 'next/image'
import React from 'react'

function Header4() {
    return (
        <div className='flex mx-20 items-center justify-between my-2 border border-gray-300 rounded-sm' >
            <div className='flex items-center'>
                <Image
                    src={"/fire.jpg"}
                    alt="fire"
                    width={200}
                    height={200}
                    className=" h-25 w-20 rounded-full"
                />
                <div>
                    <h3 className="font-bold text-xl">Get access to exclusive deals</h3>
                    <p className="text-gray-400 text-l line-clamp-1">Only the best deals reach your inbox
                    </p>
                </div>
            </div>  
            <div className='flex items-center me-5'>
                <input type="email" className='w-60 h-12 outline-none px-3 text-lg border border-gray-300 rounded-md' placeholder='e.g., john@email.com' />
                <button className='w-36 h-12 ml-2 bg-red-600 text-white rounded-md cursor-pointer'>Notify me</button>
            </div>  
        </div>
    )
}

export default Header4