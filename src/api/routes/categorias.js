const { isUser, isAdminOrUserOwner } = require("../../middlewares/auth");
const {
  getCategorias,
  getCategoriaById,
  getCategoriaByName,
  postCategoria,
  putCategoria,
  deleteCategoria,
} = require("../controllers/categorias");

const categoriasRouter = require("express").Router();

categoriasRouter.get("/:id",[isUser],getCategoriaById);
categoriasRouter.get("/nombre/:nombre",[isUser],getCategoriaByName);
categoriasRouter.get("/",[isUser],getCategorias);
categoriasRouter.post("/",[isUser,isAdminOrUserOwner], postCategoria);
categoriasRouter.put("/:id",[isUser,isAdminOrUserOwner], putCategoria);
categoriasRouter.delete("/:id",[isUser,isAdminOrUserOwner], deleteCategoria);

module.exports = categoriasRouter;
