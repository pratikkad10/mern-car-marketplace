import { useContext, useState, useEffect } from "react";
import {
  ArrowLeft,
  CarFront,
  CarFrontIcon,
  FuelIcon,
  Settings,
} from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { carBrands } from "../lib/Brand";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { transmissionTypes } from "../lib/Transmission";
import { Checkbox } from "./ui/checkbox";
import { carFeatures } from "../lib/Features";
import LocationPicker from "./Locationpicker";
import { reverseGeocode } from "../lib/Nomination";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CarContext } from "../context/CarContext";

const Sellform = () => {
  const { createCar } = useContext(CarContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/user/login");
  }, [isLoggedIn, navigate]);

  const [formData, setFormData] = useState({
    carName: "",
    brand: "",
    model: "",
    year: "",
    color: "",
    carType: "",
    price: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    features: [],
    images: [],
    description: "",
    location: "",
    phone: "",
    email: "",
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleLocationSelect = async (coords) => {
    const locationData = await reverseGeocode(coords.lat, coords.lng);
    if (locationData) {
      setFormData((prev) => ({
        ...prev,
        location: locationData.formattedLocation,
        address: locationData.address,
      }));
    }
  };

  const toggleFeature = (feature) => {
    setFormData((prev) => {
      const exists = prev.features.includes(feature);
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature],
      };
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "features" || key === "address") {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else if (key !== "images") {
        formDataToSend.append(key, formData[key]);
      }
    });
    formData.images.forEach((file) => formDataToSend.append("images", file));
    createCar(formDataToSend);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4 ">
            <div className="rounded-full bg-zinc-200 p-4 cursor-pointer">
              <ArrowLeft onClick={() => navigate(-1)} className="w-6 h-6   cursor-pointer" />

            </div>
            <div>
              <h1 className="font-bold text-2xl sm:text-3xl text-zinc-950/85">
                Sell Your Car
              </h1>
              <p className="text-zinc-950/80 text-sm sm:text-base">
                Complete the form below to list your vehicle on AutoMarket
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground p-4 sm:p-6 md:p-8 rounded-xl mt-6 sm:mt-10 flex flex-col gap-6">
          {/* BASIC INFO */}
          <div className="flex items-center gap-2">
            <CarFront className="bg-blue-500 p-1 h-8 w-8 rounded-full text-white" />
            <span className="text-lg font-semibold text-foreground">
              Basic Information
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm py-1 text-muted-foreground">Car Name</p>
              <Input
                type="text"
                placeholder="e.g BMW 5 Series 530i M Sport"
                value={formData.carName}
                onChange={(e) =>
                  setFormData({ ...formData, carName: e.target.value })
                }
              />
            </div>

            {/* Brand + Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm py-1 text-muted-foreground">Brand</p>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border px-3 py-2 rounded-md w-full text-left">
                    {formData.brand || "Select Brand"}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Select Brand</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {carBrands.map((car) => (
                      <DropdownMenuItem
                        key={car}
                        onClick={() =>
                          setFormData({ ...formData, brand: car })
                        }
                      >
                        {car}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <p className="text-sm py-1 text-muted-foreground">Model</p>
                <Input
                  type="text"
                  placeholder="e.g 5 Series"
                  value={formData.model}
                  onChange={(e) =>
                    setFormData({ ...formData, model: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Year + Color */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm py-1 text-muted-foreground">Year</p>
                <Input
                  type="text"
                  placeholder="e.g 2018"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                />
              </div>
              <div>
                <p className="text-sm py-1 text-muted-foreground">Color</p>
                <Input
                  type="text"
                  placeholder="e.g Mineral White"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Car Type */}
            <div>
              <p className="text-sm py-1 text-muted-foreground">Car Type</p>
              <RadioGroup
                onValueChange={(val) =>
                  setFormData({ ...formData, carType: val })
                }
                value={formData.carType}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
              >
                {["SUV", "Sedan", "Sports", "Luxury", "Electric"].map(
                  (type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={type} />
                      <Label htmlFor={type}>
                        <div className="h-18 w-20 p-3 flex flex-col gap-2 items-center justify-center border rounded-lg">
                          <CarFrontIcon />
                          <span className="text-foreground text-sm">{type}</span>
                        </div>
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>

            {/* TECHNICAL DETAILS */}
          <div className="flex items-center gap-2 mt-6">
              <Settings className="bg-blue-500 p-1 h-8 w-8 rounded-full text-white" />
              <span className="text-lg font-semibold text-foreground">
                Technical Details
              </span>
            </div>

            {/* Price + Mileage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm py-1 text-muted-foreground">Price (₹)</p>
                <Input
                  type="text"
                  placeholder="e.g 4500000"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div>
                <p className="text-sm py-1 text-muted-foreground">Mileage (km)</p>
                <Input
                  type="text"
                  placeholder="e.g 15000"
                  value={formData.mileage}
                  onChange={(e) =>
                    setFormData({ ...formData, mileage: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Fuel Type */}
            <div>
              <p className="text-sm py-1 text-muted-foreground">Fuel Type</p>
              <RadioGroup
                onValueChange={(val) =>
                  setFormData({ ...formData, fuelType: val })
                }
                value={formData.fuelType}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              >
                {["Petrol", "Diesel", "Electric", "Hybrid"].map((fuel) => (
                  <div key={fuel} className="flex items-center space-x-2">
                    <RadioGroupItem value={fuel} id={fuel} />
                    <Label htmlFor={fuel}>
                      <div className="h-18 w-20 p-3 flex flex-col gap-2 items-center justify-center border rounded-lg">
                        <FuelIcon />
                        <span className="text-sm text-foreground">{fuel}</span>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Transmission */}
            <div>
              <p className="text-sm py-1 text-muted-foreground">Transmission</p>
              <DropdownMenu>
                <DropdownMenuTrigger className="border px-3 py-2 rounded-md w-full text-left">
                  {formData.transmission || "Select Transmission"}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Select Transmission</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {transmissionTypes.map((transm) => (
                    <DropdownMenuItem
                      key={transm}
                      onClick={() =>
                        setFormData({ ...formData, transmission: transm })
                      }
                    >
                      {transm}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Features */}
            <div>
              <p className="text-sm py-1 text-muted-foreground">Features</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {carFeatures.map((feature) => (
                  <label key={feature} className="flex items-center gap-2">
                    <Checkbox
                      checked={formData.features.includes(feature)}
                      onCheckedChange={() => toggleFeature(feature)}
                    />
                    <span className="text-sm text-foreground">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Media */}
            <div className="space-y-4 mt-4">
              <Label className="text-sm mb-1 text-muted-foreground">Images</Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
              <div className="flex gap-2 flex-wrap mt-2">
                {previewImages.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={img}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <Label className="text-sm mb-1 mt-2 text-muted-foreground">Description</Label>
              <textarea
                rows="6"
                placeholder="Describe your vehicle..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 border rounded focus:outline-none bg-background text-foreground"
              ></textarea>
            </div>

            {/* Location */}
            <div>
              <p className="text-sm mb-1 mt-2 text-muted-foreground">Location</p>
              <Input
                placeholder="e.g. Mumbai, Maharashtra, India"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
              <div className="relative z-0 mt-2">
                <LocationPicker onLocationSelect={handleLocationSelect} />
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm py-1 text-muted-foreground">Phone Number</p>
                <Input
                  type="text"
                  placeholder="e.g 9845311553"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <p className="text-sm py-1 text-muted-foreground">Email</p>
                <Input
                  type="text"
                  placeholder="e.g rahul@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mt-6 mb-4">
              <Separator />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button
                type="submit"
                className="bg-blue-500 text-white hover:text-zinc-950"
              >
                Add Car
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sellform;
