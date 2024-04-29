require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const categoriasRouter = require("./src/api/routes/categorias");
const funkosRouter = require("./src/api/routes/funko");
const usersRouter = require("./src/api/routes/users");
const cloudinary = require("cloudinary").v2;


const app = express();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

app.use(express.json());

connectDB()


app.use("/api/v1/funkos",funkosRouter);
app.use("/api/v1/categorias",categoriasRouter);
app.use("/api/v1/users",usersRouter);

app.use("*", (req,res,next) => {
    return res.status(404).json("route not found");
});

app.listen(3000, () => {
    console.log("servidor levantado en http://localhost:3000");
});