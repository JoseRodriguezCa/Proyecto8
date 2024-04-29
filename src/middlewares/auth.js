const Categoria = require("../api/models/categorias");
const Funko = require("../api/models/funkos");
const User = require("../api/models/users");
const { verifyJwt } = require("../config/jwt");

const isUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace("Bearer ", "");
    const { id } = verifyJwt(parsedToken);
    const user = await User.findById(id);
    if (user.rol.includes("usuario")) {
      user.contrasena = null;
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(401).json("No estas Autorizadoenuser");
  }
};

const isAdminOrUserOwner = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    const funko = await Funko.findById(id);
    if (funko) {
      if (
        req.user.rol.includes("admin") ||
        req.user._id.toString() === funko.usuario.toString()
      ) {
        req.user.contrasena = null;
        req.user = user;
        return next();
      } else {
        return res.status(401).json("Error de autenticación");
      }
    }

    const categoria = await Categoria.findById(id);
    if (categoria) {
      if (req.user.rol.includes("admin")) {
        req.user.contrasena = null;
        req.user = user;
        return next();
      } else {
        return res.status(401).json("Error de autenticación");
      }
    }



    if (
      req.user.rol.includes("admin") ||
      req.user._id.toString() === id
    ) {
      req.user.contrasena = null;
      req.user = user;
      return next();
    } else {
      return res.status(401).json("Error de autenticación");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json("Error en autenticación");
  }
};


module.exports = { isUser, isAdminOrUserOwner };
