import React, { useContext } from "react";
import { Card, CardContent } from "../components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import {
  PlusCircle,
  Edit,
  Trash,
  CarFront,
  ShoppingCart,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Safety fallback in case user is null
  if (!user) {
    return <p className="p-6 text-center text-red-500">No user data found</p>;
  }

  // Extract cars from user object
  const listedCars = user?.listedCars || [];
  const buyedCars = user?.buyedCars || [];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-700">Manage your cars & purchases</p>
        </div>
        <div>
          <Button
            onClick={() => navigate("/car/sell")}
            className="bg-blue-500"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Car
          </Button>
        </div>
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
          <h2 className="text-xl font-bold">{buyedCars.length}</h2>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-gray-500">Total Spent</p>
          <h2 className="text-xl font-bold">
            ₹
            {buyedCars
              .reduce((sum, c) => sum + (c.price || 0), 0)
              .toLocaleString()}
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
          {listedCars.length === 0 ? (
            <p className="text-gray-500 mt-4">No cars listed yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {listedCars.map((car, idx) => (
                <Card key={idx} className="overflow-hidden">
                  <img
                    src={car.image || "/placeholder-car.jpg"}
                    alt={car.model || "Car"}
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-gray-500">₹{car.price}</p>
                    <div className="flex justify-between mt-3">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash className="h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Purchases */}
        <TabsContent value="purchases">
          {buyedCars.length === 0 ? (
            <p className="text-gray-500 mt-4">No purchased cars yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {buyedCars.map((car, idx) => (
                <Card key={idx} className="overflow-hidden">
                  <img
                    src={car.image || "/placeholder-car.jpg"}
                    alt={car.model || "Car"}
                    className="w-full h-40 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="font-semibold">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-gray-500">₹{car.price}</p>
                    <Button className="mt-3 w-full bg-blue-500">
                      View Invoice
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
