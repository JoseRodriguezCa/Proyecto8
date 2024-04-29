const { isUser, isAdminOrUserOwner } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const {
    getFunkos,
    getFunkoById,
    getFunkoByName,
    postFunko,
    putFunko,
    deleteFunko,
    getFunkoByPrice,
  } = require("../controllers/funko");
  
  const funkosRouter = require("express").Router();
  
  funkosRouter.get("/:id",[isUser], getFunkoById);
  funkosRouter.get("/nombre/:nombre",[isUser], getFunkoByName);
  funkosRouter.get("/precio/:precio",[isUser], getFunkoByPrice);
  funkosRouter.get("/",[isUser], getFunkos);
  funkosRouter.post("/",[isUser],upload.single("img"), postFunko);
  funkosRouter.put("/:id",[isUser, isAdminOrUserOwner],upload.single("img"), putFunko);
  funkosRouter.delete("/:id",[isUser, isAdminOrUserOwner], deleteFunko);
  
  module.exports = funkosRouter;