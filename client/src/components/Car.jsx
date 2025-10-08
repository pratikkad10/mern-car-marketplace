import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Fuel, FuelIcon, Settings } from 'lucide-react'

const Car = ({car}) => {
    return (
        <div className='w-full h-full rounded-xl shadow hover:shadow-md overflow-hidden bg-card text-card-foreground flex flex-col'>
            <div className='w-full'>
                <img src={car.images[0]} className='h-52 w-full object-cover' alt="" />
            </div>
            <h1 className='font-semibold text-lg px-4 pt-2 text-card-foreground'>{car.carName}</h1>
            <h1 className='font-bold text-xl px-4 pt-1 text-foreground'>₹{car.price}</h1>

            <div className='flex gap-4 px-4 mt-4 font-extralight'>
                <span className='flex gap-1 items-center'> <FuelIcon className='h-4 w-4' /> {car.fuelType}</span>
                <span className='flex gap-1 items-center'> <Settings className='h-4 w-4'/> {car.transmission}</span>
            </div>
            <div className='p-4 mt-auto'>
                <Button className="w-full cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90" variant="default">View Details</Button>
            </div>
        </div>
    )
}

export default Car