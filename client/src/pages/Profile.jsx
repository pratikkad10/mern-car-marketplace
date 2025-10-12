import React, { useContext, useState } from "react";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Globe, Users, Calendar, Car, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import UserDashboard from "../components/UserDashboard";
import { resetPassword } from "../services/api";

const Profile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { logout, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match. Please try again.");
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword({ oldPassword, newPassword, confirmPassword });

      toast.success("Password changed successfully! 🎉");

      // Reset form
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Close the dialog
      setIsDialogOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error changing password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected new profile pic:", file.name);
    }
  };

  if (loading) {
    return <p className="p-6 text-center">Loading profile...</p>;
  }

  if (!user) {
    return <p className="p-6 text-center text-red-500">No user data found.</p>;
  }

  return (
    <div className="p-6">
      <Card className="overflow-hidden">
        {/* Banner / Header */}
        <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-200 relative">
          <div className="absolute -bottom-12 left-6 relative w-24 h-24">
            <img
              src={user?.profilePic || "https://i.pravatar.cc/150?img=1"}
              alt={user?.fullName || "User"}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
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
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {user?.fullName || "Unnamed User"}{" "}
              <span className="text-blue-500">✔</span>
            </h2>
            <p className="text-muted-foreground mt-1">{user?.username || ""}</p>
            <p className="text-muted-foreground mt-1">{user?.email || ""}</p>
            <p className="text-muted-foreground">{user?.phone || ""}</p>
            <p className="text-muted-foreground capitalize">
              Gender: {user?.gender || "N/A"}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 mt-4 md:mt-0">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Change Password</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Old Password
                        </label>
                        <input
                          type="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Re-enter Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                      >
                        {isLoading ? "Changing..." : "Change Password"}
                      </button>
                    </form>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <Button onClick={() => logout()} variant="destructive">
                Logout
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge variant="secondary" className="flex items-center gap-2">
              <Users size={16} /> My Cars: {user?.myCars?.length || 0}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Car size={16} /> Purchased: {user?.purchasedCars?.length || 0}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Calendar size={16} /> Joined:{" "}
              {user?.createdAt
                ? new Date(user?.createdAt).getFullYear()
                : "2023"}
            </Badge>
          </div>

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

      <div>
        <UserDashboard />
      </div>
    </div>
  );
};

export default Profile;
