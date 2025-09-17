import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies?.token; // from cookies    
    // const token = req.headers.authorization?.split(" ")[1]; // via header

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token not verified!",
      error: error.message,
    });
  }
};

const isAdmin = async (req, res, next)=>{
    try {
        if(req.user.role !== "admin"){
            return res.status(400).json({
                success:false,
                message:"You are not authorized!"
            })
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"You are not authorized!",
            error:error.message
        })
    }
};

export {isLoggedIn, isAdmin};
