import { useState } from "react"
import {
  ArrowLeft, BatteryCharging, CarFront, CarFrontIcon,
  FuelIcon, Image, LucideTruckElectric, Settings, Upload, Trash2, Info
} from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { carBrands } from '../lib/Brand'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { transmissionTypes } from '../lib/Transmission'
import { Checkbox } from './ui/checkbox'
import { carFeatures } from '../lib/Features'
import LocationPicker from './Locationpicker'
import { reverseGeocode } from '../lib/Nomination'
import { Separator } from './ui/separator'
import { Button } from './ui/button'

const Sellform = () => {
  const [formData, setFormData] = useState({
    carName: "",
    brand: "",
    model: "",
    year: "",
    color: "",
    carType: "",
    price: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    features: [],
    images: [],
    description: "",
    location: "",
    phone: "",
    email: ""
  })

 const handleLocationSelect = async (coords) => {
  const locationData = await reverseGeocode(coords.lat, coords.lng)
  if (locationData) {
    setFormData((prev) => ({
      ...prev,
      location: locationData.formattedLocation,  // "Baner, Pune, Maharashtra, India"
      address: locationData.address              // structured object for later
    }))
  }
}



  // Handle checkbox for features
  const toggleFeature = (feature) => {
    setFormData((prev) => {
      const exists = prev.features.includes(feature)
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature]
      }
    })
  }

  // Handle file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files.map((f) => URL.createObjectURL(f))]
    }))
  }

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("🚗 Final Car Object:", formData)
    alert("Car object created! Check console.")
  }

  return (
    <div className='min-h-screen bg-zinc-100 p-6'>
      <form onSubmit={handleSubmit}>
        {/* ------------ HEADER ------------ */}
        <div className='flex items-center gap-4'>
          <div><ArrowLeft /></div>
          <div>
            <h1 className=' font-bold text-[30px] text-zinc-950/85'>Sell Your Car</h1>
            <p className='text-zinc-950/80 text-normal'>Complete the form below to list your vehicle on AutoMarket</p>
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl mt-10'>
          {/* ------------ BASIC INFO ------------ */}
          <div className='flex items-center gap-2'>
            <CarFront className='bg-blue-500 p-1 h-8 w-8  rounded-full text-white' />
            <span className='text-lg font-semibold text-zinc-950/85'>Basic Information</span>
          </div>

          <div className='mt-6 flex flex-col gap-4'>
            <div>
              <p className='text-sm py-2'>Car Name</p>
              <Input
                type="text"
                placeholder="e.g BMW 5 Series 530i M Sport"
                value={formData.carName}
                onChange={(e) => setFormData({ ...formData, carName: e.target.value })}
              />
            </div>

            {/* Brand + Model */}
            <div className='flex w-full justify-between '>
              <div className='w-[48%]'>
                <p className='text-sm py-2'>Brand</p>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border px-3 py-2 rounded-md w-full text-left">
                    {formData.brand || "Select Brand"}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Select Brand</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {carBrands.map((car) => (
                      <DropdownMenuItem key={car} onClick={() => setFormData({ ...formData, brand: car })}>
                        {car}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className='w-[48%]'>
                <p className='text-sm py-2'>Model</p>
                <Input
                  type="text"
                  placeholder="e.g 5 Series"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
              </div>
            </div>

            {/* Year + Color */}
            <div className='w-full flex justify-between'>
              <div className='w-[48%]'>
                <p className='text-sm py-2'>Year</p>
                <Input
                  type="text"
                  placeholder="e.g 2018"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>
              <div className='w-[48%]'>
                <p className='text-sm py-2'>Color</p>
                <Input
                  type="text"
                  placeholder="e.g Mineral White"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
              </div>
            </div>

            {/* Car Type */}
            <div>
              <p className='text-sm py-2'>Car Type</p>
              <RadioGroup
                onValueChange={(val) => setFormData({ ...formData, carType: val })}
                value={formData.carType}
                className='flex space-x-10'
              >
                {["SUV", "Sedan", "Sports", "Luxury", "Electric"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <RadioGroupItem value={type} id={type} />
                    <Label htmlFor={type}>
                      <div className='h-18 w-20 p-4 flex flex-col gap-2 items-center justify-center border rounded-lg'>
                        <CarFrontIcon />
                        <span className='text-zinc-950/80'>{type}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* ------------ TECHNICAL DETAILS ------------ */}
            <div className='flex items-center gap-2 mt-8'>
              <Settings className='bg-blue-500 p-1 h-8 w-8 rounded-full text-white' />
              <span className='text-lg font-semibold text-zinc-950/85'>Technical Details</span>
            </div>

            <div className='w-full flex justify-between'>
              <div className='w-[48%]'>
                <p className='text-sm py-2'>Price (₹)</p>
                <Input
                  type="text"
                  placeholder="e.g 4500000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className='w-[48%]'>
                <p className='text-sm py-2'>Mileage (km)</p>
                <Input
                  type="text"
                  placeholder="e.g 15000"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                />
              </div>
            </div>

            {/* Fuel Type */}
            <div className='w-full'>
              <p className='text-sm py-2'>Fuel Type</p>
              <RadioGroup
                onValueChange={(val) => setFormData({ ...formData, fuelType: val })}
                value={formData.fuelType}
                className='flex gap-6'
              >
                {["Petrol", "Diesel", "Electric", "Hybrid"].map((fuel) => (
                  <div key={fuel} className="flex items-center space-x-2">
                    <RadioGroupItem value={fuel} id={fuel} />
                    <Label htmlFor={fuel}>
                      <div className='h-18 w-20 p-4 flex flex-col gap-2 items-center justify-center border rounded-lg'>
                        <FuelIcon />
                        <span>{fuel}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Transmission */}
            <div className='w-full mt-4'>
              <p className='text-sm py-2'>Transmission</p>
              <DropdownMenu>
                <DropdownMenuTrigger className="border px-3 py-2 rounded-md w-full text-left">
                  {formData.transmission || "Select Transmission"}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Select Transmission</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {transmissionTypes.map((transm) => (
                    <DropdownMenuItem key={transm} onClick={() => setFormData({ ...formData, transmission: transm })}>
                      {transm}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Features */}
            <div className='mt-4'>
              <p className='text-sm py-2'>Features</p>
              <div className="grid grid-cols-4 gap-4">
                {carFeatures.map((feature) => (
                  <label key={feature} className="flex items-center gap-2">
                    <Checkbox
                      checked={formData.features.includes(feature)}
                      onCheckedChange={() => toggleFeature(feature)}
                    />
                    <span className="text-sm text-gray-800">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Media */}
            <div className="space-y-4 mt-6">
              <Label className="text-sm mb-1">Images</Label>
              <Input type="file" multiple accept="image/*" onChange={handleFileChange} />
              <div className="flex gap-2 flex-wrap">
                {formData.images.map((img, idx) => (
                  <img key={idx} src={img} alt="preview" className="w-24 h-24 object-cover rounded" />
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <Label className="text-sm mb-1 mt-4">Description</Label>
              <textarea
                rows="6"
                placeholder="Describe your vehicle..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none"
              ></textarea>
            </div>

            {/* Location */}
            <div>
              <p className="text-sm mb-1 mt-4">Location</p>
              <Input
                placeholder="e.g. Mumbai, Maharashtra, India"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              <LocationPicker onLocationSelect={handleLocationSelect} />
            </div>

            {/* Contact */}
            <div className='w-full flex justify-between mt-4'>
              <div className='w-[48%]'>
                <p className='text-sm py-2'>Phone Number</p>
                <Input
                  type="text"
                  placeholder="e.g 9845311553"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className='w-[48%]'>
                <p className='text-sm py-2'>Email</p>
                <Input
                  type="text"
                  placeholder="e.g rahul@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className='mt-10 mb-4'>
              <Separator />
            </div>

            {/* Buttons */}
            <div className='flex justify-between'>
              <Button variant="outline">Cancel</Button>
              <Button type="submit" className="bg-blue-500 text-white hover:text-zinc-950">
                Add Car
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Sellform
