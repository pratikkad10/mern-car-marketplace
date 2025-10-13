import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DialogClose } from "./ui/dialog";
import { X } from "lucide-react";
import { createTestDrive } from "../services/api";
import { toast } from "react-toastify";

const ScheduleTestDriveForm = ({ car, onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
    carId: car._id,
  });

  const availableSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚗 Test Drive Data:", formData);
    const response = await createTestDrive(formData)
    toast.success("Test Drive Scheduled Successfully!");
    onClose?.();
  };

  return (
    <Card className="w-full max-w-[92vw] sm:max-w-[480px] md:max-w-[560px] rounded-2xl shadow-2xl bg-white/40 dark:bg-black/30 backdrop-blur-xl border border-white/30 dark:border-white/20 text-gray-800 dark:text-white mb-4 relative">
      <CardHeader className="pb-3 relative">
        <DialogClose asChild>
          <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-6 w-6 p-0 text-white hover:bg-white/20">
            <X className="h-4 w-4 text-gray-700 dark:text-white" />
          </Button>
        </DialogClose>
        <CardTitle className="text-base font-semibold pr-8 text-gray-800 dark:text-white">Schedule Test Drive</CardTitle>
        <p className="text-xs text-gray-600 dark:text-white/70">
          {car.brand} {car.model} — {car.variant || ""}
        </p>
        <p className="text-xs text-gray-600 dark:text-white/70">
          📍 {car.seller?.fullName || "Premium Motors"} - {car.seller?.location || "Mumbai, Maharashtra"}
        </p>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Date Picker */}
          <div>
            <label className="text-sm font-medium text-gray-800 dark:text-white">Select Date</label>
            <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>

          {/* Time Slot */}
          <div>
            <label className="text-sm font-medium text-gray-800 dark:text-white">Select Time Slot</label>
            <select
              name="time"
              className="border rounded-md w-full p-2 text-sm"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a time slot --</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm font-medium text-gray-800 dark:text-white">Your Name</label>
              <Input name="name" placeholder="Enter full name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-800 dark:text-white">Phone Number</label>
              <Input
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-800 dark:text-white">Email Address</label>
            <Input
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-800 dark:text-white">Special Requirements (Optional)</label>
            <Textarea
              name="notes"
              placeholder="Any specific requests or questions..."
              value={formData.notes}
              onChange={handleChange}
              maxLength={500}
            />
          </div>

          {/* Guidelines */}
          <div className="bg-gray-100/80 dark:bg-white/10 p-2 rounded-md text-xs text-gray-700 dark:text-white/80">
            <p>• Bring valid license • 15-30 min duration</p>
            <p>• Representative included • Insurance provided</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button" size="sm">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Schedule
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ScheduleTestDriveForm;
