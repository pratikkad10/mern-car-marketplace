import React, { useContext } from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Fuel, FuelIcon, Settings, Heart } from 'lucide-react'
import { WishlistContext } from '../context/WishlistContext'

const Car = ({car}) => {
    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
    const inWishlist = isInWishlist(car._id);

    return (
        <div className='w-full h-full rounded-xl shadow-lg hover:shadow-xl overflow-hidden 
                bg-white/70 dark:bg-black/20 text-gray-800 dark:text-white 
                backdrop-blur-md border border-gray-200/50 dark:border-white/10 
                flex flex-col transition-all duration-300 
                hover:bg-white/80 dark:hover:bg-black/30 hover:-translate-y-2 hover:scale-105'>
    <div className='w-full relative'>
        <img src={car.images[0]} className='h-52 w-full object-cover' alt={car.carName} loading="lazy" />
        <button
            onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(car);
            }}
            className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-black/60 backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
        >
            <Heart
                className={`h-5 w-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-white'}`}
            />
        </button>
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