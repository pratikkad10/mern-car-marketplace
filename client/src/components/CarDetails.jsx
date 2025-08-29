import React from 'react'
import { Button } from './ui/button'
import { Check, ContactIcon, Heart, LocateIcon,  Share , Mail, Phone, Store } from 'lucide-react'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import CarDashboard from './CarDashboard'

const CarDetails = ({ car }) => {

    return (
        <div>

            <div >
                <img className='rounded-md' src={car.image} alt="carimage" />
            </div>

            <div className='mt-4 flex justify-between'>
                <div>
                    <p className='text-sm text-gray-500'>Price</p>
                    <p className='font-bold text-xl'>₹{car.price}</p>
                </div>

                <div className='flex gap-2'>
                    <Button variant="outline"> <Heart /> Save</Button>
                    <Button variant="outline"> <Share /> Share</Button>
                    <Button className='bg-blue-500' > <ContactIcon /> Contact Seller</Button>
                </div>
            </div>

            <div className='flex mt-4 w-full gap-4'>
                {/* specification */}
                <div className='w-[50%]'>
                    <h1 className='font-semibold'>Specifications</h1>
                    <div className="grid grid-cols-2 gap-4 mt-4">

                        <Badge variant="outline" className="flex flex-col items-start p-3 w-full bg-muted/40">
                            <p className="text-xs text-gray-500">Make</p>
                            <p className="font-medium">{car.brand}</p>
                        </Badge>

                        <Badge variant="outline" className="flex flex-col items-start p-3 w-full bg-muted/40">
                            <p className="text-xs text-gray-500">Model</p>
                            <p className="font-medium">{car.model}</p>
                        </Badge>

                        <Badge variant="outline" className="flex flex-col items-start p-3 w-full bg-muted/40">
                            <p className="text-xs text-gray-500">Year</p>
                            <p className="font-medium">{car.year}</p>
                        </Badge>

                        <Badge variant="outline" className="flex flex-col items-start p-3 w-full bg-muted/40">
                            <p className="text-xs text-gray-500">Mileage</p>
                            <p className="font-medium">{car.mileage} km</p>
                        </Badge>

                        <Badge variant="outline" className="flex flex-col items-start p-3 w-full bg-muted/40">
                            <p className="text-xs text-gray-500">Fuel Type</p>
                            <p className="font-medium">{car.fuelType}</p>
                        </Badge>

                        <Badge variant="outline" className="flex flex-col items-start p-3 w-full bg-muted/40">
                            <p className="text-xs text-gray-500">Transmission</p>
                            <p className="font-medium">{car.transmission}</p>
                        </Badge>

                        <Badge variant="outline" className="flex flex-col items-start p-3 w-full bg-muted/40">
                            <p className="text-xs text-gray-500">Engine</p>
                            <p className="font-medium">3.0L Turbo</p>
                        </Badge>

                        <Badge variant="outline" className="flex flex-col items-start p-3 w-full bg-muted/40">
                            <p className="text-xs text-gray-500">Color</p>
                            <p className="font-medium">{car.color}</p>
                        </Badge>
                    </div>
                </div>

                {/* features */}
                <div className="flex flex-col w-[50%] gap-2">
                    <h3 className="font-semibold mb-2">Key Features</h3>
                    {car.features.map((feature, id) => (
                        <Badge
                            key={id}
                            variant="outline"
                            className="w-full py-2 pl-3 flex items-center gap-2 justify-start bg-muted/40"
                        >
                            <Check className="w-4 h-4 text-blue-500" />
                            <span>{feature}</span>
                        </Badge>
                    ))}
                </div>

            </div>

            <div className='mt-4'>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className='font-extralight text-sm'>{car.description}</p>
            </div>

            <div className="mt-4">
                <h3 className="font-semibold mb-2">Location</h3>
                <Badge
                    className="w-full justify-start truncate py-2 bg-muted/40"
                    variant="outline"
                    title={car.location}
                >
                    <LocateIcon />
                    {car.location}
                </Badge>
            </div>

            <div className="mt-6">
                <h3 className="font-semibold mb-3">Seller Information</h3>

                <Card className="rounded-2xl shadow-sm bg-gray-50">
                    <CardContent className="p-4">
                        {/* Seller Header */}
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                <Store className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className="ml-4">
                                <h4 className="font-semibold">BMW Excellence Motorrad</h4>
                                <p className="text-sm text-gray-500">Premium BMW Dealer</p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-gray-600 mb-4">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <Phone className="w-4 h-4 mr-2" />
                                <span>+91 80 4567 8900</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                <span>contact@bmwexcellence.com</span>
                            </div>
                        </div>

                        {/* Contact Button */}
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md">
                            Contact Seller
                        </Button>

                        <Button className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md">
                            Buy car
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <CarDashboard car={car} />

        </div>
    )
}

export default CarDetails