const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

//DOTENV
dotenv.config();

// MONGODB CONNECTION
connectDB();

//REST OBJECT
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ROUTES
app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/api/v1/post", require("./routes/postRoutes"));
//app.use("/api/v1/hotel", require("./routes/hotelRoutes"));
app.use("/api/v1/booking", require("./routes/bookingRoutes"));

//home
app.get("/", (req,res)=>{
  res.status(200).send({
    "success":true,
    "msg":"Node Server Running"
  })
})


//PORT
const PORT = process.env.PORT || 8078;

//listen
app.listen(PORT, () => {
  console.log(`Server Runnning ${PORT}`.bgGreen.white);
});