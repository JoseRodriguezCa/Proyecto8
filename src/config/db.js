const mongoose = require("mongoose");



connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("conectado a la BBDD");
    } catch (error) {
        console.log("No se pudo conectar a la BBDD");
    }
};


module.exports = { connectDB }