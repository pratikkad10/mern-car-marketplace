import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import Car from "./Car"
import { testCar } from "../lib/cardata"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import CarDetails from "./CarDetails"
import { filterCars } from "../utils/filtercars"

const BuyCar = () => {

    const [cars, setCars] = useState([testCar])

    const [open, setOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

  const [filters, setFilters] = useState({
    type: "All Types",
    fuel: "All Fuel Types",
    minPrice: "",
    maxPrice: "",
    transmission: "All Transmissions",
  })

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const applyFilters = () => {
    console.log("Applied Filters:", filters)
    // call filterCars(cars, filters) here
    filterCars(cars, filters)
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Find Your Next Vehicle</CardTitle>
        </CardHeader>
        <CardContent className="bg-muted/80 rounded-md mx-8  py-10 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          
          {/* Car Type */}
          <Select
            value={filters.type}
            onValueChange={(val) => handleFilterChange("type", val)}
          >
            <SelectTrigger className="w-[100%]">
              <SelectValue placeholder="Car Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Types">All Types</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="Sedan">Sedan</SelectItem>
              <SelectItem value="Hatchback">Hatchback</SelectItem>
            </SelectContent>
          </Select>

          {/* Fuel Type */}
          <Select
            value={filters.fuel}
            onValueChange={(val) => handleFilterChange("fuel", val)}
          >
            <SelectTrigger  className="w-[100%]">
              <SelectValue placeholder="Fuel Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Fuel Types">All Fuel Types</SelectItem>
              <SelectItem value="Petrol">Petrol</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="CNG">CNG</SelectItem>
              <SelectItem value="Electric">Electric</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="₹ Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            />
            <Input
              type="number"
              placeholder="₹ Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            />
          </div>

          <Select
            value={filters.transmission}
            onValueChange={(val) => handleFilterChange("transmission", val)}
          >
            <SelectTrigger  className="w-[100%]">
              <SelectValue placeholder="Transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Transmissions">All Transmissions</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="Automatic">Automatic</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="secondary" className="bg-blue-500 text-white hover:text-zinc-900" onClick={applyFilters}>Apply Filters</Button>
        </CardContent>
      </Card>


      <Card className="mt-4 mx-2">
        <CardHeader>
          <CardTitle>Listed Vehicles</CardTitle>
        </CardHeader>
        
        <CardContent className="flex gap-2">
            {cars.map((car, idx) => (
            <div 
              key={idx}
              onClick={() => { setSelectedCar(car); setOpen(true); }}
              className="cursor-pointer"
            >
              <Car car={car} />
            </div>
          ))}
        </CardContent>
      </Card>


      {/* Car Details Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-3xl max-h-[88vh] overflow-y-auto scrollbar-hide">
          <DialogHeader>
            <DialogTitle>{selectedCar?.name}</DialogTitle>
          </DialogHeader>
            {selectedCar && <CarDetails car={selectedCar} />}
        </DialogContent>
      </Dialog>


        

    </div>
  )
}

export default BuyCar
