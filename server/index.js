import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import router from "./routes/User.route.js";
import cors from "cors";
import carRouter from "./routes/Car.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [process.env.BASE_URL, "http://localhost:5173",
      "https://car-marketplace-frontend.vercel.app", // ✅ Vercel frontend domain
      "https://car-marketplace-frontend-ktxy.onrender.com" ],
    credentials: true,
  })
);

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server running with import syntax 🚀");
});

app.use("/user", router);
app.use("/cars", carRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
