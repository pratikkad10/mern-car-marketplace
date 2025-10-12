import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Fuel, FuelIcon, Settings } from 'lucide-react'

const Car = ({car}) => {
    return (
        <div className='w-full h-full rounded-xl shadow-lg hover:shadow-xl overflow-hidden 
                bg-white dark:bg-black text-black dark:text-white 
                backdrop-blur-md border border-white/10 
                flex flex-col transition-all duration-300 
                hover:bg-black/10 hover:translate-y-1'>
    <div className='w-full'>
        <img src={car.images[0]} className='h-52 w-full object-cover' alt={car.carName} />
    </div>
    <h1 className='font-semibold text-lg px-4 pt-2'>{car.carName}</h1>
    <h1 className='font-bold text-xl px-4 pt-1'>₹{car.price}</h1>

    <div className='flex gap-4 px-4 mt-4 font-extralight'>
        <span className='flex gap-1 items-center'> <FuelIcon className='h-4 w-4' /> {car.fuelType}</span>
        <span className='flex gap-1 items-center'> <Settings className='h-4 w-4'/> {car.transmission}</span>
    </div>
    <div className='p-4 mt-auto'>
        <Button className="w-full cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90" variant="default">
            View Details
        </Button>
    </div>
</div>
    )
}

export default Car