import { CopyCheck, CopyrightIcon } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <div className=''>
            <div className=' flex items-center justify-between px-4 h-14 w-full bg-[#101826] z-10'>
                <p className='text-zinc-300/80 text-sm flex gap-1  items-center'>
                    <CopyrightIcon className='h-3 w-3 ' /> <span>2025 AutoMarket. All rights reserved.</span>
                </p>
                <div className='flex gap-4 text-zinc-300/80 text-sm'>
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                    <span>Cookie Policy</span>
                </div>
            </div>
        </div>
    )
}

export default Footer