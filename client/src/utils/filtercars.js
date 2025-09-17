// const normalize = str => (str ? str.toLowerCase().trim() : "");

// export function filterCars(cars, { type, fuel, minPrice, maxPrice, transmission}) {
//   return cars.filter(car => {
//     const carType = normalize(car.type);
//     const carFuel = normalize(car.fuel);
//     const carTransmission = normalize(car.transmission);

//     return (
//       (normalize(type) === "all types" || carType === normalize(type)) &&
//       (normalize(fuel) === "all fuel types" || carFuel === normalize(fuel)) &&
//       (!minPrice || car.price >= minPrice) &&
//       (!maxPrice || car.price <= maxPrice) &&
//       (normalize(transmission) === "all transmissions" || carTransmission === normalize(transmission))
//     );
//   });
// }


const normalize = str => (str ? str.toLowerCase().trim() : "");

export function filterCars(cars, { type, fuel, minPrice, maxPrice, transmission }) {
  // convert price filters into numbers, or undefined if empty
  const min = minPrice ? Number(minPrice) : undefined;
  const max = maxPrice ? Number(maxPrice) : undefined;

  return cars.filter(car => {
    const carType = normalize(car.carType);          // use car.carType instead of car.type
    const carFuel = normalize(car.fuelType);         // use car.fuelType instead of car.fuel
    const carTransmission = normalize(car.transmission);

    return (
      (normalize(type) === "all types" || carType === normalize(type)) &&
      (normalize(fuel) === "all fuel types" || carFuel === normalize(fuel)) &&
      (min === undefined || car.price >= min) &&
      (max === undefined || car.price <= max) &&
      (normalize(transmission) === "all transmissions" || carTransmission === normalize(transmission))
    );
  });
}
