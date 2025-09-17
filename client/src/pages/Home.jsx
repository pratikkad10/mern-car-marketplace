import React, { useContext, useEffect, useState } from 'react';
import img from '../assets/img2.jpg';
import { Button } from '../components/ui/button.jsx';
import Car from '../components/Car.jsx';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog.jsx';
import CarDetails from '../components/CarDetails.jsx';
import Review from '../components/Review.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CarContext } from '../context/CarContext';
import { useNavigate } from 'react-router-dom';
import { useSpin } from '../hooks/useSpin';
import { RefreshCw } from 'lucide-react';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const {spinning, spin} = useSpin()
  const navigate = useNavigate()

  const { cars, getCars} = useContext(CarContext)
  
  useEffect(()=>{
    getCars()
  }, [])

  const handleRefresh = () => {
    spin(true);

    getCars()

    spin(false)
  };



  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <div className="relative w-full h-88 ">
        <img className="absolute inset-0 w-full h-full object-cover z-0" src={img} alt="" />
        <div className="absolute z-10 w-[40%] top-22 left-4">
          <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect Drive</h1>
          <p className='text-zinc-100/80 leading-5 text-lg'>
            Discover the easiest way to buy and sell cars online. Browse thousands of vehicles or list yours in minutes.
          </p>
          <div className='flex gap-4 my-6'>
            <Button onClick={()=> getCars()} variant="secondary">Browse Cars</Button>
            <Button onClick={()=> navigate("/car/sell")} variant="outline" className="text-zinc-100">Sell Your Car</Button>
          </div>
        </div>
      </div>

      {/* Car Listing */}
      {/* <div className='p-4'>
        <h1 className='text-2xl font-semibold text-zinc-950/80'>Listed Vehicles</h1>
        <div className='flex flex-wrap gap-4 mt-4'>
          {cars.map((car, idx) => (
            <div 
              key={idx}
              onClick={() => { setSelectedCar(car); setOpen(true); }}
              className="cursor-pointer"
            >
              <Car car={car} />
            </div>
          ))}
        </div>
      </div> */}

      <Card className="mt-4 mx-2">
        <CardHeader>
          <CardTitle className="flex justify-between">
            Listed Vehicles
            <button onClick={handleRefresh}>
              <RefreshCw className={`w-5 h-5 ${spinning ? "animate-spin" : ""}`} />
            </button>
            </CardTitle>
        </CardHeader>
        
        <CardContent className="flex flex-wrap gap-2">
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

      <div className="bottom flex flex-col items-center py-4 justify-center">
        <p className="font-bold text-2xl">What Our Customers Say</p>
        <div className='flex gap-2 justify-center flex-wrap'>
          <Review />
          <Review />
          <Review />
        </div>
      </div>
    </div>
  );
};

export default Home;
