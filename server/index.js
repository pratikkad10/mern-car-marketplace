import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import router from "./routes/User.route.js";
import cors from "cors"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
      origin: [process.env.BASE_URL, 'http://localhost:5173'],
      credentials: true,
      methods: ["GET", "POST", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );


connectDB()
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server running with import syntax 🚀");
});

app.use("/user", router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
