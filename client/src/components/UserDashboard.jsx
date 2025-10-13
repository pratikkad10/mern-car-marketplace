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
  Heart,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { WishlistContext } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { deleteCar } from "../services/api";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { wishlist, toggleWishlist, loading: wishlistLoading } = useContext(WishlistContext);

  // Safety fallback in case user is null
  if (!user) {
    return <p className="p-6 text-center text-red-500">No user data found</p>;
  }

  // Extract cars from user object
  const listedCars = user?.listedCars || [];
  // console.log("Listed Cars:", listedCars[0]?._id);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-gray-600 dark:text-white/80">Manage your cars & purchases</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 text-center bg-white/70 dark:bg-black/20 backdrop-blur-md border border-gray-200/50 dark:border-white/10">
          <CarFront className="mx-auto text-blue-500" />
          <p className="text-gray-600 dark:text-white/70">Listed Cars</p>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{listedCars.length}</h2>
        </Card>
        <Card className="p-4 text-center bg-white/70 dark:bg-black/20 backdrop-blur-md border border-gray-200/50 dark:border-white/10">
          <Heart className="mx-auto text-red-500" />
          <p className="text-gray-600 dark:text-white/70">Wishlist</p>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{wishlist.length}</h2>
        </Card>
        <Card className="p-4 text-center bg-white/70 dark:bg-black/20 backdrop-blur-md border border-gray-200/50 dark:border-white/10">
          <p className="text-gray-600 dark:text-white/70">Total Value</p>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            ₹
            {wishlist
              .reduce((sum, c) => sum + (c.price || 0), 0)
              .toLocaleString()}
          </h2>
        </Card>
      </div>

      {/* Tabs for Listings & Purchases */}
      <Tabs defaultValue="listings" className="w-full mt-6">
        <TabsList className="grid grid-cols-2 w-full sm:w-[320px]">
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>

        {/* Listings */}
        <TabsContent value="listings">
          {listedCars.length === 0 ? (
            <p className="text-gray-600 dark:text-white/70 mt-4">No cars listed yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {listedCars.map((car, idx) => (
                <Card key={idx} className="overflow-hidden flex flex-col bg-white/70 dark:bg-black/20 backdrop-blur-md border border-gray-200/50 dark:border-white/10">
                  {/* Image */}
                  <div className="h-52 w-full relative">
                    <img
                      src={car?.images[0] || "/placeholder-car.jpg"}
                      alt={car?.model || "Car"}
                      className="h-full w-full object-cover rounded-t-lg"
                    />
                  </div>

                  {/* Card Content */}
                  <CardContent className="p-4 flex-1 flex flex-col justify-between ">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                        {car?.brand} {car?.model}
                      </h3>
                      <p className="text-gray-600 dark:text-white/70 text-sm mt-1">₹{car?.price.toLocaleString()}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-4">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        <Edit className="h-4 w-4" /> Edit
                      </Button>

                      <Button
                        onClick={async () => {
                          try {
                            if (window.confirm("Are you sure you want to delete this car?")) {
                              const response = await deleteCar({ carId: car._id });
                              toast.success("Car deleted successfully!");
                              setTimeout(() => window.location.reload(), 1000); // refresh page after success
                            }
                          } catch (err) {
                            toast.error("Failed to delete car!");
                            console.error(err);
                          }
                        }}
                        variant="destructive"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        <Trash className="h-4 w-4" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Wishlist */}
        <TabsContent value="wishlist">
          {wishlistLoading ? (
            <p className="text-gray-600 dark:text-white/70 mt-4">Loading wishlist...</p>
          ) : wishlist.length === 0 ? (
            <p className="text-gray-600 dark:text-white/70 mt-4">No cars in wishlist yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {wishlist.map((car, idx) => (
                <Card key={idx} className="overflow-hidden bg-white/70 dark:bg-black/20 backdrop-blur-md border border-gray-200/50 dark:border-white/10">
                  <div className="relative">
                    <img
                      src={car.images?.[0] || "/placeholder-car.jpg"}
                      alt={car.model || "Car"}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
                    <button
                      onClick={() => toggleWishlist(car)}
                      className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-black/60 backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
                    >
                      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-gray-600 dark:text-white/70">₹{car.price?.toLocaleString()}</p>
                    <Button
                      onClick={() => navigate(`/cars/buy`)}
                      className="mt-3 w-full bg-white text-black hover:bg-white/90"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div>
        
      </div>
    </div>
  );
};

export default UserDashboard;
