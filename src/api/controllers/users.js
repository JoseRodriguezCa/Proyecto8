const { generateSign } = require("../../config/jwt");
const { deleteFile } = require("../../utils/deleteFile");
const { findById } = require("../models/funkos");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json("error en getUsers");
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json("error en getUserById");
  }
};

const getUserByName = async (req, res, next) => {
  try {
    const { nombreUsuario } = req.params;
    const user = await User.find({ nombreUsuario });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json("error en getUserByName");
  }
};

const register = async (req, res, next) => {
  try {
    if(req.body.rol === "usuario"){
      const newUser = new User(req.body);
      if (req.file) {
        newUser.imagenPerfil = req.file.path;
      }
      const userSaved = await newUser.save();
      return res.status(201).json(userSaved);
    }else{
      return res.status(400).json("Necesitas registrarte con el rol usuario");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json("error en register");
  }
};

const login = async (req,res,next ) => {
    try {
        const {nombreUsuario, contrasena} = req.body;
        const user = await User.findOne({ nombreUsuario });
        if(!user){
            return res.status(400).json("Usuario o Contraseña incorrectos en usuario");
        }

        if(bcrypt.compareSync(req.body.contrasena, user.contrasena)) {
            const token = generateSign(user._id)
            return res.status(200).json({ user,token });
        }else  {
            return res.status(400).json("Usuario o Contraseña incorrectos en contraseña");
        }

    } catch (error) {
        return res.status(400).json("error en login");
    }
}

const putUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldUser = await User.findById(id);
    const newUser = new User(req.body);

    console.log(oldUser);
    
    if(req.file) {
      newUser.imagenPerfil = req.file.path;
      deleteFile(oldUser.imagenPerfil);
    }

    newUser._id = id;
    if(oldUser.rol.includes(req.body.rol)){
        return res.status(400).json("ya tienes este rol")
    }

    if (newUser.contrasena) {
        const hashedPassword = bcrypt.hashSync(newUser.contrasena, 10);
        newUser.contrasena = hashedPassword;
    }

    if (req.body.rol && (req.body.rol === "usuario" || req.body.rol === "admin")) {
      newUser.rol = [...oldUser.rol, req.body.rol];
    } else {
      newUser.rol = oldUser.rol;
    }
    const changeUser = await User.findByIdAndUpdate(id,newUser,{ new:true });
    return res.status(200).json(changeUser);
  } catch (error) {
    return res.status(400).json("error en putUser");
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDelete = await User.findByIdAndDelete(id);
    deleteFile(userDelete.imagenPerfil);
    return res.status(200).json({mensaje:"User Eliminado",userDelete});
  } catch (error) {
    return res.status(400).json("error en getUsers");
  }
};


module.exports = { getUsers,getUserById,getUserByName,register,putUser,deleteUser,login }