import React, { createContext, useContext, useState  } from "react";
import { AuthContext } from "./AuthContext";
import { CreateCar } from "../services/api";
import { toast } from "react-toastify";

 

// eslint-disable-next-line react-refresh/only-export-components
export const CarContext = createContext(null);

export function CarProvider({ children }) {

    const { setLoading } = useContext(AuthContext);
    const [cars, setCars] = useState(null);

    const createCar = async (data) => {
        try {
          setLoading(true)
          await CreateCar(data)
          toast.success("Car added successfully")
        } catch (error) {
          console.log(error);
          toast.error("Error while adding car")
        } finally{
          setLoading(false)
        }
      };

    const getAllCars = async ()=>{
      try {
        setLoading(true)
        const response= await getAllCars()
        console.log("All cars are", response);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false)
      }
    }

  const value = {
     createCar,
     getAllCars,
     cars,
     setCars
  };

  return (
    <CarContext.Provider value={value}>
      {children}
    </CarContext.Provider>
  );
}
