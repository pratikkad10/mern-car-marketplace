import React, { useState } from "react";
import {
    Check,
    ContactIcon,
    Heart,
    LocateIcon,
    Share,
    Mail,
    Phone,
    Store,
    X,
    MapPin,
    Star,
    PhoneCall,
    MessageCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import CarDashboard from "./CarDashboard";
import ScheduleTestDriveForm from "./ScheduleTestDriveForm";
import { createIntrestedUser } from "../services/api";
import { toast } from "react-toastify";

/* -------------------- CONTACT SELLER FORM -------------------- */
const ContactSellerForm = ({car,  seller }) => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: ""
    });

    console.log(car);
    

    const [charCount, setCharCount] = useState(0);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === "message") setCharCount(value.length);
    };

    // Open dialer
    const handleCallNow = () => {
        window.open(`tel:${seller?.phone || "+919876543210"}`);
    };

    // Open WhatsApp
    const handleWhatsApp = () => {
        const phone = seller?.phone?.replace(/\D/g, "") || "919876543210";
        const text = encodeURIComponent("Hi, I'm interested in your car listing.");
        window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
    };

    // Send message
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            carId: car?.id || car?._id || null,
            sellerId: seller?._id || null,
            sellerName: seller?.fullName || "Premium Motors Delhi",
            sellerPhone: seller?.phone || "+91 98765 43210",
            buyerName: formData.name,
            buyerPhone: formData.phone,
            message: formData.message || "I'm interested in this car. Please contact me.",
            sentAt: new Date().toISOString(),
        };

        console.log("📦 Payload to send:", payload);

        const response = await createIntrestedUser(payload);

        toast.success("Message sent successfully!");
        setFormData({ name: "", phone: "", message: "" });
        setCharCount(0);
    };

    return (
        <Card className="rounded-2xl shadow-lg bg-black/20 backdrop-blur-md border border-white/10 text-white w-full max-w-[92vw] sm:max-w-[420px] md:max-w-[480px] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
                <CardTitle>Contact Seller</CardTitle>
                <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                        <X className="h-5 w-5" />
                    </Button>
                </DialogClose>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Seller Info */}
                <div>
                    <p className="font-medium text-base">
                        {seller?.fullName || "Premium Motors Delhi"}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                        <Phone className="h-4 w-4" />
                        <span>{seller?.phone || "+91 98765 43210"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                        <MapPin className="h-4 w-4" />
                        <span>{seller?.location || "Mumbai, Maharashtra"}</span>
                    </div>
                    {/* <div className="flex items-center gap-1 text-sm text-yellow-500 mt-1">
                        <Star className="h-4 w-4 fill-yellow-500" />
                        <span className="text-gray-800 font-medium">4.5</span>
                        <span className="text-gray-500">(127 reviews)</span>
                    </div> */}
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2 mt-4">
                    <Button
                        onClick={handleCallNow}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                        <PhoneCall className="mr-2 h-4 w-4" /> Call Now
                    </Button>
                    <Button
                        onClick={handleWhatsApp}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                        <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                    </Button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3 mt-4">
                    <div>
                        <label className="text-sm font-medium text-white">Your Name</label>
                        <Input
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-white">Your Phone</label>
                        <Input
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-white">Message</label>
                        <Textarea
                            name="message"
                            placeholder="I'm interested in this car. Please contact me."
                            maxLength={500}
                            value={formData.message}
                            onChange={handleChange}
                        />
                        <p className="text-xs text-white/70 mt-1">{charCount}/500 characters</p>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                        Send Message
                    </Button>
                </form>

                <p className="text-xs text-white/70 mt-2 text-center">
                    ℹ️ Your contact details will be shared with the seller. They will contact you directly.
                </p>
            </CardContent>
        </Card>
    );
};

/* -------------------- CAR DETAILS COMPONENT -------------------- */
const CarDetails = ({ car }) => {
    return (
        <div>
            {/* Car Image */}
            <div>
                <img className="rounded-md w-full" src={car.images[0]} alt="car" />
            </div>

            {/* Price + Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <p className="text-sm text-white/70">Price</p>
                    <p className="font-bold text-xl">₹{car.price}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline">
                        <Heart /> Save
                    </Button>
                    <Button variant="outline">
                        <Share /> Share
                    </Button>

                    {/* Contact Seller Dialog (Accessibility Fixed) */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-white text-black hover:bg-white/90">
                                <ContactIcon className="mr-2 h-4 w-4" /> Contact Seller
                            </Button>
                        </DialogTrigger>

                        {/* Constrain the dialog content so it doesn't force the page to scroll.
                            Use a centered container with a sensible max-height and internal scrolling
                            only when the form is taller than the viewport. Styling only — no logic changes. */}
                        <DialogContent showCloseButton={false} className="p-0 border-none bg-transparent shadow-none max-w-[500px] max-h-[95vh] overflow-hidden">
                            {/* Accessibility fix */}
                            <VisuallyHidden>
                                <DialogTitle>Contact Seller Form</DialogTitle>
                            </VisuallyHidden>

                                <div className="w-full flex justify-center items-center">
                                    <ContactSellerForm car={car} seller={car.seller} />
                                </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Specifications */}
            <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="">
                    <h1 className="font-semibold">Specifications</h1>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {[
                            ["Make", car.brand],
                            ["Model", car.model],
                            ["Year", car.year],
                            ["Mileage", `${car.mileage} km`],
                            ["Fuel Type", car.fuelType],
                            ["Transmission", car.transmission],
                            ["Car Type", car.carType],
                            ["Color", car.color],
                        ].map(([label, value], i) => (
                            <Badge
                                key={i}
                                variant="outline"
                                className="flex flex-col items-start p-3 w-full bg-muted/40"
                            >
                                <p className="text-xs text-white/70">{label}</p>
                                <p className="font-medium">{value}</p>
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold mb-2">Key Features</h3>
                    {car.features &&
                        JSON.parse(car.features[0]).map((feature, id) => (
                            <Badge
                                key={id}
                                variant="outline"
                                className="w-full py-2 pl-3 flex items-center gap-2 justify-start bg-muted/40"
                            >
                                <Check className="w-4 h-4 text-blue-500" />
                                <span>{feature}</span>
                            </Badge>
                        ))}
                </div>
            </div>

            {/* Description */}
            <div className="mt-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="font-extralight text-sm">{car.description}</p>
            </div>

            {/* Location */}
            <div className="mt-4">
                <h3 className="font-semibold mb-2">Location</h3>
                <Badge
                    className="w-full justify-start truncate py-2 bg-muted/40"
                    variant="outline"
                    title={car.location}
                >
                    <LocateIcon />
                    {car.location}
                </Badge>
            </div>

            {/* Dashboard */}
            <CarDashboard car={car} />

            {/* Seller Information */}
            <div className="mt-6">
                <h3 className="font-semibold mb-3">Seller Information</h3>
                <Card className="rounded-2xl shadow-sm bg-black/20 backdrop-blur-md border border-white/10 text-white">
                    <CardContent className="p-4 ">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                <Store className="w-6 h-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <h4 className="font-semibold">{car.seller.fullName}</h4>
                                {/* <h4 className="font-semibold">{car.seller._id}</h4> */}
                                <p className="text-sm text-white/70">{car.seller.email}</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-white/70 mb-4">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <Phone className="w-4 h-4 mr-2" />
                                <span>{car.seller.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                <span>{car.seller.email}</span>
                            </div>
                        </div>

                        {/* <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md">
              Contact Seller
            </Button> */}
                        {/* Schedule Test Drive Dialog */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full mt-2 bg-white hover:bg-white/90 text-black rounded-md">
                                    Schedule Test Drive
                                </Button>
                            </DialogTrigger>

                        <DialogContent showCloseButton={false} className="p-0 border-none bg-transparent shadow-none max-w-[600px] max-h-[95vh] overflow-hidden flex flex-col">
                                <VisuallyHidden>
                                    <DialogTitle>Schedule Test Drive</DialogTitle>
                                </VisuallyHidden>
                            <div className="w-full flex justify-center -mt-8">
                              <ScheduleTestDriveForm car={car} />
                            </div>
                            </DialogContent>
                        </Dialog>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CarDetails;
