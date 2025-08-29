import { ArrowLeft, BatteryCharging, BellElectric, CarFront, CarFrontIcon, CarIcon, CarTaxiFrontIcon, FuelIcon, Image, LucideTruckElectric, Radio, Settings, Settings2, Info, Upload, Trash2 } from 'lucide-react'
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

  const handleLocationSelect = async (coords) => {
    console.log("Selected location:", coords); // {lat, lng}
    const location = await reverseGeocode(coords.lat, coords.lng);
    if (location) {
      console.log("Location details:", location);
      // Optionally store in state
      // setLocation(location);
    }
  };
  return (
    <div className='min-h-screen bg-zinc-100 p-6'>
      <div className='flex items-center gap-4'>
        <div><ArrowLeft /></div>
        <div>
          <h1 className=' font-bold text-[30px] text-zinc-950/85'>Sell Your Car</h1>
          <p className='text-zinc-950/80 text-normal'>Complete the form below to list your vehicle on AutoMarket</p>
        </div>
      </div>

      <div className='bg-white p-6 rounded-xl mt-10'>
        <div className='flex items-center gap-2'>
          <CarFront className='bg-blue-500 p-1 h-8 w-8  rounded-full text-white' />
          <span className='text-lg font-semibold text-zinc-950/85'>Basic Information</span>
        </div>

        <div className='mt-6 flex flex-col gap-4'>
          <div>
            <p className='text-sm py-2'>Car Name</p>
            <Input type="text" placeholder="e.g BMW 5 Series 530i M Sport" />
          </div>

          <div className='flex w-full justify-between '>
            <div className='w-[48%]'>
              <p className='text-sm py-2'>Brand</p>
              <DropdownMenu className="">
                <DropdownMenuTrigger className="
                file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
                pt-2 text-zinc-800/80
                ">Select Brand</DropdownMenuTrigger>
                <DropdownMenuContent className="">
                  <DropdownMenuLabel className="w-120">Select Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {
                    carBrands.map((car) => { return <DropdownMenuItem>{car}</DropdownMenuItem> })
                  }
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className='w-[48%]'>
              <p className='text-sm py-2'>Model</p>
              <Input type="text" placeholder="e.g 5 Series" />
            </div>
          </div>

          <div className='w-full flex justify-between'>
            <div className='w-[48%]'>
              <p className='text-sm py-2'>Year</p>
              <Input type="text" placeholder="e.g 2018" />
            </div>
            <div className='w-[48%]'>
              <p className='text-sm py-2'>Color</p>
              <Input type="text" placeholder="e.g Mineral White" />
            </div>
          </div>

          <div>
            <p className='text-sm py-2'>Car Type</p>
            <RadioGroup className='flex space-x-36' defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">
                  <div className='h-18 w-10 p-8 flex flex-col gap-2 items-center justify-center border rounded-lg'>
                    <span><CarFrontIcon /></span>
                    <span className='text-zinc-950/80'>SUV</span>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">
                  <div className='h-18 w-10 p-8 flex flex-col gap-2 items-center justify-center border rounded-lg'>
                    <span><CarFrontIcon /></span>
                    <span className='text-zinc-950/80'>Sedan</span>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-three" id="option-three" />
                <Label htmlFor="option-three">
                  <div className='h-18 w-10 p-8 flex flex-col gap-2 items-center justify-center border rounded-lg'>
                    <span><CarFrontIcon /></span>
                    <span className='text-zinc-950/80'>Sports</span>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-five" id="option-five" />
                <Label htmlFor="option-five">
                  <div className='h-18 w-10 p-8 flex flex-col gap-2 items-center justify-center border rounded-lg'>
                    <span><CarFrontIcon /></span>
                    <span className='text-zinc-950/80'>Luxury</span>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-six" id="option-six" />
                <Label htmlFor="option-six">
                  <div className='h-18 w-10 p-8 flex flex-col gap-2 items-center justify-center border rounded-lg'>
                    <span><CarFrontIcon /></span>
                    <span className='text-zinc-950/80'>Electric</span>
                  </div>
                </Label>
              </div>

            </RadioGroup>
          </div>

          <div className='flex items-center gap-2 mt-8'>
            <Settings className='bg-blue-500 p-1 h-8 w-8  rounded-full text-white' />
            <span className='text-lg font-semibold text-zinc-950/85'>Technical Details</span>
          </div>

          <div className='w-full flex justify-between'>
            <div className='w-[48%]'>
              <p className='text-sm py-2'>Price (₹)</p>
              <Input type="text" placeholder="e.g 4500000" />
            </div>
            <div className='w-[48%]'>
              <p className='text-sm py-2'>Mileage (km)</p>
              <Input type="text" placeholder="e.g 15000" />
            </div>
          </div>


          <div className='w-full flex justify-between'>
            <div className='w-[48%]'>
              <p className='text-sm py-2'>Fuel Type</p>
              <div className='grid grid-cols-2'>

                <RadioGroup className='flex space-x-36' defaultValue="option-six">
                  <div className='col-span-1 space-y-6'>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-six" id="option-six" />
                      <Label htmlFor="option-one">
                        <div className='h-18 w-10 p-8 flex flex-col gap-2 items-center justify-center border rounded-lg'>
                          <span><FuelIcon /></span>
                          <span className='text-zinc-950/80'>Petrol</span>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-seven" id="option-seven" />
                      <Label htmlFor="option-seven">
                        <div className='h-18 w-10 p-8 flex flex-col gap-2 items-center justify-center border rounded-lg'>
                          <span><FuelIcon /></span>
                          <span className='text-zinc-950/80'>Diesel</span>
                        </div>
                      </Label>
                    </div>
                  </div>

                  <div className='col-span-1 space-y-6'>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-eight" id="option-eight" />
                      <Label htmlFor="option-eight">
                        <div className='h-18 w-10 p-8 flex flex-col gap-2 items-center justify-center border rounded-lg'>
                          <span><LucideTruckElectric /></span>
                          <span className='text-zinc-950/80'>Electric</span>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-nine" id="option-nine" />
                      <Label htmlFor="option-nine">
                        <div className='h-18 w-10 p-8 flex flex-col gap-2 items-center justify-center border rounded-lg'>
                          <span><BatteryCharging /></span>
                          <span className='text-zinc-950/80'>Hybrid</span>
                        </div>
                      </Label>
                    </div>
                  </div>


                </RadioGroup>

              </div>
            </div>
            <div className='w-[48%]'>
              <p className='text-sm py-2'>Transmission</p>
              <DropdownMenu className="">
                <DropdownMenuTrigger className="
                file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
                pt-2 text-zinc-800/80
                ">Transmission Type</DropdownMenuTrigger>
                <DropdownMenuContent className="">
                  <DropdownMenuLabel className="w-120">Select Brand</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {
                    transmissionTypes.map((transm) => { return <DropdownMenuItem>{transm}</DropdownMenuItem> })
                  }
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
            <p className='text-sm py-2'>Features</p>
            <div className="grid grid-cols-4 gap-4">
              {carFeatures.map((feature) => (
                <label key={feature} className="flex items-center gap-2">
                  <Checkbox />
                  <span className="text-sm text-gray-800">{feature}</span>
                </label>
              ))}
            </div>
          </div>


          <div className='flex items-center gap-2 mt-8'>
            <Image className='bg-blue-500 p-1 h-8 w-8  rounded-full text-white' />
            <span className='text-lg font-semibold text-zinc-950/85'>Media & Description</span>
          </div>

          <div className="space-y-4">
            {/* Labels */}
            <div>
              <Label className="text-sm mb-1">Images</Label>
              <p className="text-zinc-700/80 text-sm">
                Add up to 10 photos of your vehicle. First image will be the main listing photo.
              </p>
            </div>

            {/* Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Upload Box */}
              <label
                htmlFor="image-upload"
                className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-700 mb-1">Drag & drop image here</p>
                <p className="text-xs text-gray-500">or click to browse files</p>
                <Input id="image-upload" type="file" multiple accept="image/*" className="hidden" />
              </label>

              {/* Preview Image Card */}
              <div className="border border-gray-300 rounded overflow-hidden">
                <div className="relative pb-[60%]">
                  <img
                    src="https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Car Preview"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-3 bg-white flex justify-between items-center">
                  <span className="text-sm text-gray-700">Main Image</span>
                  <button
                    type="button"
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Info Note */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
              <Info className="w-4 h-4  text-blue-500" />
              <span>High-quality images increase your chances of selling faster</span>
            </div>
          </div>

        </div>

        <div>
          <Label className="text-sm mb-1 mt-4">Description</Label>
          <textarea id="description" name="description" rows="6"
            placeholder="Describe your vehicle in detail. Include information about its condition, history, modifications, and any other relevant details."
            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1  "></textarea>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">Minimum 100 characters</span>
            <span className="text-xs text-gray-500" id="char-count">0/2000</span>
          </div>
        </div>
        <div className='flex items-center gap-2 mt-8'>
          <Image className='bg-blue-500 p-1 h-8 w-8  rounded-full text-white' />
          <span className='text-lg font-semibold text-zinc-950/85'></span>
        </div>
        <div>
          <p className="text-sm mb-1 mt-4">Location & Contact</p>
          <Input placeholder="e.g. Mumbai, Maharashtra, India" />
          <div className='mt-4'>
            <h2>Select Car Location</h2>
            <LocationPicker onLocationSelect={handleLocationSelect} />
          </div>
        </div>

        <div className='w-full flex justify-between mt-4'>
          <div className='w-[48%]'>
            <p className='text-sm py-2'>Phone Number</p>
            <Input type="text" placeholder="e.g 9845311553" />
          </div>
          <div className='w-[48%]'>
            <p className='text-sm py-2'>Email</p>
            <Input type="text" placeholder="e.g rahul@gmail.com" />
          </div>
        </div>
        <div className='mt-10 mb-4'>
          <Separator />
        </div>

        <div className='flex justify-between'>
          <Button variant="outline">Cancel</Button>
          <Button className="bg-blue-500 text-white hover:text-zinc-950 " variant="secondary">Add Car</Button>
        </div>

        <div className="mt-10 bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Tips for a Successful Listing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="flex">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 shrink-0">
                <div className="w-5 h-5 flex items-center justify-center text-blue-600 font-bold text-sm">📷</div>
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-900 mb-1">Quality Photos</h4>
                <p className="text-sm text-gray-600">
                  Take clear, well-lit photos from multiple angles. Include interior, exterior, and any notable features.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 shrink-0">
                <div className="w-5 h-5 flex items-center justify-center text-blue-600 font-bold text-sm">📝</div>
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-900 mb-1">Detailed Description</h4>
                <p className="text-sm text-gray-600">
                  Be honest about the condition. Include service history, modifications, and unique selling points.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 shrink-0">
                <div className="w-5 h-5 flex items-center justify-center text-blue-600 font-bold text-sm">💰</div>
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-900 mb-1">Competitive Pricing</h4>
                <p className="text-sm text-gray-600">
                  Research similar vehicles to set a fair market price. Be prepared to negotiate.
                </p>
              </div>
            </div>

          </div>
        </div>



      </div>


    </div>
  )
}

export default Sellform