import React, { createContext, useState  } from "react";
import { CreateCar, getAllCars } from "../services/api";
import { toast } from "react-toastify";

 

// eslint-disable-next-line react-refresh/only-export-components
export const CarContext = createContext(null);

export function CarProvider({ children }) {

    const [cars, setCars] = useState([]);
    const [carsLoading, setCarsLoading] = useState(false);
    const [createCarLoading, setCreateCarLoading] = useState(false);

    const createCar = async (data) => {
        try {
          setCreateCarLoading(true)
          await CreateCar(data)
          toast.success("Car added successfully")
        } catch (error) {
          console.log(error);
          toast.error("Error while adding car")
        } finally{
          setCreateCarLoading(false)
        }
      };

    const getCars = async ()=>{
      try {
        setCarsLoading(true)
        const response= await getAllCars()
        console.log(response);
        
        setCars(response.data.cars)
      } catch (error) {
        console.log(error);
      } finally{
        setCarsLoading(false)
      }
    }

  const value = {
     createCar,
     getCars,
     cars,
     setCars,
     carsLoading,
     createCarLoading
  };

  return (
    <CarContext.Provider value={value}>
      {children}
    </CarContext.Provider>
  );
}
