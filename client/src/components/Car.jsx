import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { testCar } from '../lib/cardata'
import { Button } from './ui/button'
import { Fuel, FuelIcon, Settings } from 'lucide-react'

const Car = () => {
    return (
        <div className='w-90 rounded-xl shadow hover:shadow-md overflow-hidden'>
            <div>
                <img src={testCar.image} className='rounded-lg h-52 w-full' alt="" />
            </div>
            <h1 className='font-semibold text-lg text-zinc-950/80 px-4 pt-2' >{testCar.name}</h1>
            <h1 className='font-bold text-xl text-zinc-950/80 px-4 pt-1'>₹{testCar.price}</h1>

            <div className='flex gap-4 mx-4 mt-4 font-extralight'>
                <span className='flex gap-1 items-center'> <FuelIcon className='h-4 w-4' /> {testCar.fuelType}</span>
                <span className='flex gap-1 items-center'> <Settings className='h-4 w-4'/> {testCar.transmission}</span>
            </div>
            <div className='p-2'>
                <Button className="w-full cursor-pointer" variant="default">View Details</Button>
            </div>
        </div>
    )
}

export default Car