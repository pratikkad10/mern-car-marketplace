import React from "react"
import { Card, CardHeader, CardContent } from "./ui/card"
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

const CarDashboard = ({ car }) => {
  // Mock data for comparisons
  const priceComparison = [
    { name: "This Car", price: car.price },
    { name: "Market Avg", price: 1500000 },
    { name: "Top Variant", price: 2000000 },
  ]

  const depreciation = [
    { year: "2025", value: car.price },
    { year: "2026", value: car.price * 0.85 },
    { year: "2027", value: car.price * 0.72 },
    { year: "2028", value: car.price * 0.60 },
    { year: "2029", value: car.price * 0.50 },
  ]

  return (
    <div className=" mt-4 space-y-6">
      {/* Price Comparison */}
      <Card>
        <CardHeader>Price Comparison</CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={priceComparison}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Depreciation */}
      <Card>
        <CardHeader>Resale Value Projection</CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={depreciation}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance */}
      {/* <Card>
        <CardHeader>Performance Stats</CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded-xl text-center">
            <p className="text-sm text-gray-500">Horsepower</p>
            <p className="text-xl font-bold">{car.horsepower || "250"} HP</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-xl text-center">
            <p className="text-sm text-gray-500">Torque</p>
            <p className="text-xl font-bold">{car.torque || "350"} Nm</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-xl text-center">
            <p className="text-sm text-gray-500">Top Speed</p>
            <p className="text-xl font-bold">{car.topSpeed || "220"} km/h</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-xl text-center">
            <p className="text-sm text-gray-500">0–100 km/h</p>
            <p className="text-xl font-bold">{car.acceleration || "7.5"} sec</p>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}

export default CarDashboard
