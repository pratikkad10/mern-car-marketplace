import React, { useContext, useEffect, useState, useRef } from 'react';
import img from '../assets/img3.avif';
import { Button } from '../components/ui/button.jsx';
import Car from '../components/Car.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog.jsx';
import CarDetails from '../components/CarDetails.jsx';
import Review from '../components/Review.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CarContext } from '../context/CarContext';
import { useNavigate } from 'react-router-dom';
import { useSpin } from '../hooks/useSpin';
import { RefreshCw } from 'lucide-react';
import { reviews } from '../lib/review';
import Loader from '../components/Loader.jsx';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const { spinning, spin } = useSpin();
  const navigate = useNavigate();

  const { cars, getCars, carsLoading } = useContext(CarContext);
  const listRef = useRef(null);

  useEffect(() => {
    getCars();
  }, []);

  const handleRefresh = () => {
    spin(true);
    getCars();
    spin(false);
  };

  const handleBrowseClick = () => {
    getCars();
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='flex flex-col overflow-x-hidden min-h-screen bg-gradient-to-b from-white via-violet-50 to-violet-200 dark:bg-none' style={{
      background: `var(--tw-gradient-stops, 
        radial-gradient(ellipse 800px 600px at 88% 12%, rgba(216, 180, 180, 0.08), transparent 65%),
        radial-gradient(ellipse 700px 500px at 15% 88%, rgba(158, 164, 199, 0.12), transparent 60%),
        radial-gradient(ellipse 600px 400px at 42% 75%, rgba(255, 140, 80, 0.06), transparent 55%),
        radial-gradient(ellipse 500px 350px at 78% 45%, rgba(120, 200, 140, 0.04), transparent 50%),
        radial-gradient(ellipse 900px 700px at 55% 35%, rgba(27, 29, 36, 0.9), transparent 75%),
        linear-gradient(135deg, #080808 0%, #1b1d24 35%, #0f1015 70%, #0a0a0a 100%)
      )`,
      backgroundBlendMode: 'soft-light, overlay, multiply, screen, normal, normal'
    }}>
      {/* Hero Section */}
      <div className="relative w-full h-[18rem] sm:h-[22rem] md:h-[26rem] lg:h-[26rem] mt-0">
        <img className="absolute inset-0 w-full h-full object-cover object-center" src={img} alt="Hero banner showing cars" />
        <div className="absolute z-[5] top-8 sm:top-12 md:top-16 inset-x-0 px-4 sm:px-8 md:px-12 lg:px-0">
          <div className="w-[92%] sm:w-[70%] md:w-[60%] lg:w-[46%] xl:w-[42%] mx-auto lg:mx-0 lg:ml-16 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 leading-tight">
            Find Your Perfect Drive
            </h1>
            <p className='text-sm sm:text-base md:text-lg text-zinc-100/90 leading-snug sm:leading-relaxed'>
              Discover the easiest way to buy and sell cars online. Browse thousands of vehicles or list yours in minutes.
            </p>
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 my-4 sm:my-6 justify-center lg:justify-start'>
              <Button onClick={handleBrowseClick} variant="secondary" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">Browse Cars</Button>
              <Button onClick={() => navigate("/car/sell")} variant="outline" className="w-full sm:w-auto bg-transparent border-primary text-white hover:bg-primary/10">Sell Your Car</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Car Listing */}
      <Card ref={listRef} className="mt-4 mx-2 sm:mx-4 lg:mx-8 overflow-hidden scroll-mt-24 bg-transparent border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="font-bold">
              Listed Vehicles
            </div>
            <button onClick={handleRefresh} className="ml-2">
              <RefreshCw className={`w-5 h-5 ${spinning ? "animate-spin" : ""}`} />
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-4 pb-6">
          {carsLoading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
              {cars.map((car, idx) => (
                <div
                  key={idx}
                  onClick={() => { setSelectedCar(car); setOpen(true); }}
                  className="cursor-pointer h-full"
                >
                  <Car car={car} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Car Details Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[92vw] sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[65vw] xl:max-w-[60vw] w-full mx-auto max-h-[88vh] overflow-y-auto scrollbar-hide bg-black/20 backdrop-blur-md border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>{selectedCar?.name}</DialogTitle>
          </DialogHeader>
          {selectedCar && <CarDetails car={selectedCar} />}
        </DialogContent>
      </Dialog>

      {/* Customer Reviews */}
      <div className="bottom flex flex-col items-center py-6 sm:py-8 justify-center">
        <p className="font-bold text-xl sm:text-2xl md:text-3xl mb-6">What Our Customers Say</p>
        <div className="w-full overflow-hidden">
          <div className="flex animate-scroll gap-6 w-max">
            {[...reviews, ...reviews].map((review, index) => (
              <div key={index} className="flex-shrink-0 w-80">
                <Review review={review} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
