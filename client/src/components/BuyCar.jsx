import React, { useContext, useEffect, useState } from "react"
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import CarDetails from "./CarDetails"
import { filterCars } from "../utils/filtercars"
import { CarContext } from "../context/CarContext"
import { RefreshCw } from "lucide-react"
import { useSpin } from "../hooks/useSpin"

const BuyCar = () => {
  const { cars, getCars } = useContext(CarContext);
  const { spinning, spin } = useSpin(1000);
  const [filteredCars, setFilteredCars] = useState(cars);
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const [filters, setFilters] = useState({
    type: "All Types",
    fuel: "All Fuel Types",
    minPrice: "",
    maxPrice: "",
    transmission: "All Transmissions",
  });

  useEffect(() => {
    setFilteredCars(cars);
  }, [cars]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    // console.log("Applied Filters:", filters);
    const filtered = filterCars(cars, filters);
    setFilteredCars(filtered);
  };


  const handleRefresh = () => {
    spin(true);

    getCars()

    spin(false)
  };

  return (
    <div className="p-4 min-h-screen">
      <Card className="mt-4 mx-2 sm:mx-4 lg:mx-8 bg-white/70 dark:bg-black/20 backdrop-blur-md border border-gray-200/50 dark:border-white/10 text-gray-800 dark:text-white">
        <CardHeader>
          <CardTitle className="text-gray-800 dark:text-white">Find Your Next Vehicle</CardTitle>
        </CardHeader>
        <CardContent className="py-6 sm:py-8 md:py-10 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">

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

          <Select
            value={filters.fuel}
            onValueChange={(val) => handleFilterChange("fuel", val)}
          >
            <SelectTrigger className="w-[100%]">
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
            <SelectTrigger className="w-[100%]">
              <SelectValue placeholder="Transmission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Transmissions">All Transmissions</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="Automatic">Automatic</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="secondary"
            className="bg-white text-black hover:bg-white/90"
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </CardContent>
      </Card>

      {/*Listed Cars*/}
      <Card className="mt-4 mx-2 sm:mx-4 lg:mx-8 bg-white/70 dark:bg-black/20 backdrop-blur-md border border-gray-200/50 dark:border-white/10 text-gray-800 dark:text-white">
        <CardHeader>
          <CardTitle className="flex justify-between text-gray-800 dark:text-white">
            Listed Vehicles
            <button onClick={handleRefresh}>
              <RefreshCw className={`w-5 h-5 ${spinning ? "animate-spin" : ""}`} />
            </button>
          </CardTitle>
        </CardHeader>

        <CardContent className="px-2 sm:px-4 pb-6">
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
              {filteredCars.map((car, idx) => (
                <div
                  key={idx}
                  onClick={() => { setSelectedCar(car); setOpen(true); }}
                  className="cursor-pointer h-full"
                >
                  <Car car={car} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No cars match your filters</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[92vw] sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[65vw] xl:max-w-[60vw] w-full mx-auto max-h-[88vh] overflow-y-auto scrollbar-hide">
          <DialogHeader>
            <DialogTitle>{selectedCar?.carName}</DialogTitle>
          </DialogHeader>
          {selectedCar && <CarDetails car={selectedCar} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BuyCar