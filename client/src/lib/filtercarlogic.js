// Example car data
const cars = [
  { name: "Car A", type: "SUV", fuel: "Petrol", price: 1200000, transmission: "Automatic" },
  { name: "Car B", type: "Sedan", fuel: "Diesel", price: 800000, transmission: "Manual" },
  { name: "Car C", type: "Hatchback", fuel: "CNG", price: 500000, transmission: "Manual" },
  { name: "Car D", type: "SUV", fuel: "Electric", price: 1500000, transmission: "Automatic" }
];

// Utility: normalize string (for case-insensitive match)
const normalize = str => (str ? str.toLowerCase().trim() : "");

// Optimized filter function
function filterCars({ type, fuel, minPrice, maxPrice, transmission }) {
  return cars.filter(car => {
    const carType = normalize(car.type);
    const carFuel = normalize(car.fuel);
    const carTransmission = normalize(car.transmission);

    return (
      (normalize(type) === "all types" || carType === normalize(type)) &&
      (normalize(fuel) === "all fuel types" || carFuel === normalize(fuel)) &&
      (!minPrice || car.price >= minPrice) &&
      (!maxPrice || car.price <= maxPrice) &&
      (normalize(transmission) === "all transmissions" || carTransmission === normalize(transmission))
    );
  });
}

// Example usage:
const filters = {
  type: "suv",              // works in any case
  fuel: "ALL Fuel Types",   // works in any case
  minPrice: 1000000,
  maxPrice: 1600000,
  transmission: "automatic" // works in any case
};

console.log(filterCars(filters));
