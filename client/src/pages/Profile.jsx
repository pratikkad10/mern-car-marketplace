import React from "react"
import { Card, CardHeader, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Globe, Users, Calendar, Car, Camera } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Profile = () => {
    const user = {
        id: 1,
        name: "Pratik Kad",
        email: "pratik@example.com",
        phone: "+91 9876543210",
        gender: "male",
        profilePic: "https://i.pravatar.cc/150?img=3",
        myCars: [
            { id: 1, title: "Honda City 2018", price: "8,50,000", image: "/car1.jpg" },
            { id: 2, title: "Hyundai Creta 2020", price: "12,00,000", image: "/car2.jpg" },
        ],
        purchasedCars: [
            { id: 3, title: "Maruti Swift 2019", price: "6,50,000", image: "/car3.jpg" },
        ],
    }
    const navigate = useNavigate()
    const dashboardbtnhandler = ()=>{
        navigate("/user/dashboard")
    }

    const handleProfilePicUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            console.log("Selected new profile pic:", file.name)
            // here you can upload to server or update preview
        }
    }

    return (
        <div className="p-6">
            <Card className="overflow-hidden">
                {/* Banner / Header */}
                <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-200 relative">
                    {/* Profile Image with Upload Button */}
                    <div className="absolute -bottom-12 left-6 relative w-24 h-24">
                        <img
                            src={user.profilePic}
                            alt={user.name}
                            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                        />
                        {/* Upload Button Overlay */}
                        <label
                            htmlFor="profile-upload"
                            className="absolute bottom-0 right-0 bg-blue-500/40 text-white rounded-full p-2 shadow-md cursor-pointer z-10 hover:bg-blue-600/40"
                        >
                            <Camera size={16} />
                            <input
                                id="profile-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleProfilePicUpload}
                            />
                        </label>
                    </div>
                </div>

                <CardHeader className="mt-14 flex flex-col md:flex-row justify-between items-start md:items-center px-6">
                    {/* User Info */}
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            {user.name} <span className="text-blue-500">✔</span>
                        </h2>
                        <p className="text-muted-foreground mt-1">{user.email}</p>
                        <p className="text-muted-foreground">{user.phone}</p>
                        <p className="text-muted-foreground capitalize">Gender: {user.gender}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-3 mt-4 md:mt-0">
                        <Button variant="outline">Change Password</Button>
                        <Button variant="destructive">Logout</Button>
                    </div>
                    <div className="w-full">
                        <Button 
                        onClick={dashboardbtnhandler}
                        className="w-full bg-blue-400 hover:bg-blue-500 text-white hover:text-white" variant="outline">Dashboard</Button>
                    </div>
                    </div>
                    
                </CardHeader>

                <CardContent className="px-6 pb-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mt-4">
                        <Badge variant="secondary" className="flex items-center gap-2">
                            <Users size={16} /> My Cars: {user.myCars.length}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-2">
                            <Car size={16} /> Purchased: {user.purchasedCars.length}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-2">
                            <Calendar size={16} /> Joined: 2023
                        </Badge>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-5 mt-6 text-muted-foreground">
                        <a href="#" className="hover:text-blue-500">
                            <Globe size={20} />
                        </a>
                        <a href="#" className="hover:text-blue-500">
                            <i className="fab fa-instagram text-xl"></i>
                        </a>
                        <a href="#" className="hover:text-blue-500">
                            <i className="fab fa-facebook text-xl"></i>
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Profile
