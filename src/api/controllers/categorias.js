const Categoria = require("../models/categorias");

const getCategorias = async (req, res, next) => {
  try {
    const categorias = await Categoria.find();
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(400).json("error en get");
  }
};

const getCategoriaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findById(id);
    return res.status(200).json(categoria);
  } catch (error) {
    return res.status(400).json("error en getbyid");
  }
};

const getCategoriaByName = async (req, res, next) => {
  try {
    const { nombre } = req.params;
    const categoria = await Categoria.find({ nombre });
    return res.status(200).json(categoria);
  } catch (error) {
    return res.status(400).json("error en getbyname");
  }
};

const postCategoria = async (req, res, next) => {
  try {
    const newCategoria = new Categoria(req.body);
    const categoriaSaved = await newCategoria.save();
    return res.status(201).json(categoriaSaved);
  } catch (error) {
    return res.status(400).json("error en post");
  }
};

const putCategoria = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newCategoria = new Categoria(req.body);
    newCategoria._id = id;
    const categoriaUpdated = await Categoria.findByIdAndUpdate(id,newCategoria, { new: true });
    return res.status(200).json(categoriaUpdated);
  } catch (error) {
    return res.status(400).json("error en put");
  }
};

const deleteCategoria = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoriaDeleted = await Categoria.findByIdAndDelete(id);
    return res.status(200).json( {mensaje:"categoria Eliminada", categoriaDeleted});
  } catch (error) {
    return res.status(400).json("error en delete");
  }
};

module.exports = {
  getCategorias,
  getCategoriaById,
  getCategoriaByName,
  postCategoria,
  putCategoria,
  deleteCategoria,
};
