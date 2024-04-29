const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: true },
  },
  {
    timestamps:true,
    collection: "categorias",
  }
);

const Categoria = mongoose.model("categorias", categoriaSchema, "categorias");

module.exports = Categoria;
