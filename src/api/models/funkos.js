const mongoose = require("mongoose");

const funkoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, unique: true },
    precio: { type: Number, required: true },
    img: { type: String, required: true },
    categorias: [
      { type: mongoose.Schema.Types.ObjectId, ref:"categorias", required: true },
    ],
    usuario: [
      { type: mongoose.Schema.Types.ObjectId, ref:"users", required: true },
    ],
    stock: { type: Number, required: true },
  },
  { timestamps: true, collection: "funkos" }
);

const Funko = mongoose.model("funkos", funkoSchema, "funkos");
module.exports = Funko;
