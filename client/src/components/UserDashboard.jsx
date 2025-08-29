import React from "react"
import { Card, CardHeader, CardContent } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { PlusCircle, Edit, Trash, CarFront, ShoppingCart } from "lucide-react"

const UserDashboard = ({ user1, listedCars1, purchasedCars1 }) => {

    const user = {
    name: "john alice",
  }

  // Dummy Listed Cars
  const listedCars = [
    {
      brand: "BMW",
      model: "X5",
      price: 6500000,
      image: "https://images.unsplash.com/photo-1617940041554-bd0b746af0e3?w=600",
    },
    {
      brand: "Audi",
      model: "A6",
      price: 5500000,
      image: "https://images.unsplash.com/photo-1605559424843-9d7e7f061e45?w=600",
    },
  ]

  // Dummy Purchased Cars
  const purchasedCars = [
    {
      brand: "Mercedes",
      model: "C-Class",
      price: 4800000,
      image: "https://images.unsplash.com/photo-1617814074801-5dcb6b4c6d5e?w=600",
    },
    {
      brand: "Tesla",
      model: "Model 3",
      price: 4200000,
      image: "https://images.unsplash.com/photo-1620891549027-018a5765a50d?w=600",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
          <p className="text-gray-500">Manage your cars & purchases</p>
        </div>
        <Button className="bg-blue-500">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Car
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <CarFront className="mx-auto text-blue-500" />
          <p className="text-gray-500">Listed Cars</p>
          <h2 className="text-xl font-bold">{listedCars.length}</h2>
        </Card>
        <Card className="p-4 text-center">
          <ShoppingCart className="mx-auto text-green-500" />
          <p className="text-gray-500">Purchased</p>
          <h2 className="text-xl font-bold">{purchasedCars.length}</h2>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-gray-500">Total Spent</p>
          <h2 className="text-xl font-bold">
            ₹{purchasedCars.reduce((sum, c) => sum + c.price, 0).toLocaleString()}
          </h2>
        </Card>
      </div>

      {/* Tabs for Listings & Purchases */}
      <Tabs defaultValue="listings" className="w-full mt-6">
        <TabsList className="grid grid-cols-2 w-[300px]">
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="purchases">Purchased Cars</TabsTrigger>
        </TabsList>

        {/* Listings */}
        <TabsContent value="listings">
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {listedCars.map((car, idx) => (
              <Card key={idx} className="overflow-hidden">
                <img src={car.image} alt={car.model} className="w-full h-40 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-semibold">{car.brand} {car.model}</h3>
                  <p className="text-gray-500">₹{car.price}</p>
                  <div className="flex justify-between mt-3">
                    <Button variant="outline" size="sm"><Edit className="h-4 w-4" /> Edit</Button>
                    <Button variant="destructive" size="sm"><Trash className="h-4 w-4" /> Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Purchases */}
        <TabsContent value="purchases">
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {purchasedCars.map((car, idx) => (
              <Card key={idx} className="overflow-hidden">
                <img src={car.image} alt={car.model} className="w-full h-40 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-semibold">{car.brand} {car.model}</h3>
                  <p className="text-gray-500">₹{car.price}</p>
                  <Button className="mt-3 w-full bg-blue-500">View Invoice</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default UserDashboard
