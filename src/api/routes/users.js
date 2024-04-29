const { isUser, isAdminOrUserOwner } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const {
  getUsers,
  getUserById,
  getUserByName,
  register,
  putUser,
  deleteUser,
  login,
} = require("../controllers/users");

const usersRouter = require("express").Router();

usersRouter.get("/nombre/:nombreUsuario",[isUser], getUserByName);
usersRouter.get("/:id",[isUser], getUserById);
usersRouter.get("/",[isUser], getUsers);
usersRouter.post("/login", login);
usersRouter.post("/register",upload.single("imagenPerfil"), register);
usersRouter.put("/:id",[isUser, isAdminOrUserOwner],upload.single("imagenPerfil"), putUser);
usersRouter.delete("/:id",[isUser, isAdminOrUserOwner], deleteUser);


module.exports = usersRouter;