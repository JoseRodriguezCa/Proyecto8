const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true, unique: true },
    nombreUsuario: { type: String, trim: true, required: true, unique: true },
    contrasena: { type: String, trim: true, required: true },
    anoNacimiento: { type: Number, trim: true, required: true },
    rol: { type: [String], trim: true, default:["usuario"], enum:["usuario","admin"]},
    imagenPerfil: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.pre("save", function () {
  this.contrasena = bcrypt.hashSync(this.contrasena, 10);
});

const User = mongoose.model("users", userSchema, "users");

module.exports = User;
