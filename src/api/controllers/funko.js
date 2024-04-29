const { deleteFile } = require("../../utils/deleteFile");
const Funko = require("../models/funkos");

const getFunkos = async (req, res, next) => {
  try {
    const funkos = await Funko.find().populate({
      path: "usuario",
      select: "nombreUsuario"
    })
    .populate("categorias");
    return res.status(200).json(funkos);
  } catch (error) {
    return res.status(400).json("error en get");
  }
};

const getFunkoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const funko = await Funko.findById(id).populate({
      path: "usuario",
      select: "nombreUsuario"
    })
    .populate("categorias");
    return res.status(200).json(funko);
  } catch (error) {
    return res.status(400).json("error en getbyid");
  }
};

const getFunkoByName = async (req, res, next) => {
  try {
    const { nombre } = req.params;
    const funko = await Funko.find({ nombre }).populate({
      path: "usuario",
      select: "nombreUsuario"
    })
    .populate("categorias");
    return res.status(200).json(funko);
  } catch (error) {
    return res.status(400).json("error en getbyname");
  }
};

const getFunkoByPrice = async (req, res, next) => {
    try {
      const { precio } = req.params;
      const funko = await Funko.find({ precio:{ $lte:precio } }).populate({
        path: "usuario",
        select: "nombreUsuario"
      })
      .populate("categorias");
      return res.status(200).json(funko);
    } catch (error) {
      return res.status(400).json("error en getbyprice");
    }
  };

const postFunko = async (req, res, next) => {
  try {
    const newFunko = new Funko(req.body);
    if(req.file) {
      newFunko.img = req.file.path;
    }
    const funkoSaved = await newFunko.save();
    return res.status(201).json(funkoSaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const putFunko = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldFunko = await Funko.findById(id);
    const newFunko = new Funko(req.body);
    if(req.file) {
      newFunko.img = req.file.path;
      deleteFile(oldFunko.img);
    }
    newFunko._id = id;
    newFunko.usuario = oldFunko.usuario;
    const categorias = req.body.categorias || [];
    newFunko.categorias = [...oldFunko.categorias, ...categorias];
    const funkoUpdated = await Funko.findByIdAndUpdate(id,newFunko, { new: true });
    return res.status(200).json(funkoUpdated);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteFunko = async (req, res, next) => {
  try {
    const { id } = req.params;
    const funko = await Funko.findByIdAndDelete(id);
    deleteFile(funko.img);
    return res.status(200).json({mensaje:"funko eliminada", funko});
  } catch (error) {
    return res.status(400).json("error en delete");
  }
};

module.exports = {
  getFunkos,
  getFunkoById,
  getFunkoByName,
  postFunko,
  putFunko,
  deleteFunko,
  getFunkoByPrice
};
