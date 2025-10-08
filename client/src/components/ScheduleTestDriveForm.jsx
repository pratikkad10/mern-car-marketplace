import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
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
    <Card className="w-[500px] rounded-2xl shadow-lg bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Schedule Test Drive</CardTitle>
        <p className="text-sm text-gray-500 mt-1">
          {car.brand} {car.model} — {car.variant || ""}
        </p>
        <p className="text-sm text-gray-500">
          📍 {car.seller?.fullName || "Premium Motors"} - {car.seller?.location || "Mumbai, Maharashtra"}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date Picker */}
          <div>
            <label className="text-sm font-medium">Select Date</label>
            <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>

          {/* Time Slot */}
          <div>
            <label className="text-sm font-medium">Select Time Slot</label>
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">Your Name</label>
              <Input name="name" placeholder="Enter full name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-sm font-medium">Phone Number</label>
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
            <label className="text-sm font-medium">Email Address</label>
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
            <label className="text-sm font-medium">Special Requirements (Optional)</label>
            <Textarea
              name="notes"
              placeholder="Any specific requests or questions..."
              value={formData.notes}
              onChange={handleChange}
              maxLength={500}
            />
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 p-3 rounded-md text-sm text-gray-700">
            <p>• Please bring a valid driving license</p>
            <p>• Duration: 15–30 minutes</p>
            <p>• A representative will accompany you</p>
            <p>• Insurance coverage is provided</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Schedule Test Drive
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ScheduleTestDriveForm;
