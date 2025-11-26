import Libro from '../models/libro.model.js';
import mongoose from "mongoose";

// ===============================
// GET TODOS LOS LIBROS
// ===============================
// ===============================
// GET TODOS LOS LIBROS + BUSCAR
// ===============================
export const getAllLibros = async (req, res) => {
  console.log('OBTENER TODOS LOS LIBROS');

  try {
    const buscar = req.query.buscar; // ← aquí llega "harry", "a", etc.

    let libros = [];

    if (buscar) {
      libros = await Libro.find({
        $or: [
          { titulo: { $regex: buscar, $options: "i" } },
          { autor: { $regex: buscar, $options: "i" } },
          { categoria: { $regex: buscar, $options: "i" } }
        ]
      });
    } else {
      libros = await Libro.find({}, { __v: 0 });
    }

    return res.status(200).json({ libros });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al obtener los libros'
    });
  }
};
// ===============================
// GET LIBRO POR ID
// ===============================
export const getLibroById = async (req, res) => {
  console.log('LIBRO POR ID');
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const libro = await Libro.findById(id);

    if (!libro) {
      return res.status(404).json({ msg: 'Libro no encontrado' });
    }

    return res.status(200).json({ libro });

  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener el libro'
    });
  }
};

// ===============================
// POST CREAR LIBRO
// ===============================
export const postLibro = async (req, res) => {
  console.log('POST LIBRO');

  const body = req.body;
  const libro = new Libro(body);

  try {
    const validationError = libro.validateSync();
    if (validationError) {
      const errorMessages = Object.values(validationError.errors).map(e => e.message);
      return res.status(400).json({ error: errorMessages });
    }

    await libro.save();

    return res.status(201).json({ libro });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error al crear libro"
    });
  }
};

// ===============================
// PUT ACTUALIZAR LIBRO
// ===============================
export const putLibro = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const libro = await Libro.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });

    if (!libro) {
      return res.status(404).json({ msg: 'Libro no encontrado' });
    }

    return res.status(200).json({ libro });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error al actualizar el libro'
    });
  }
};

// ===============================
// DELETE ELIMINAR LIBRO
// ===============================
export const deleteLibro = async (req, res) => {
  console.log("DELETE LIBRO");
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID no válido" });
    }

    const libro = await Libro.findByIdAndDelete(id);

    if (!libro) {
      return res.status(404).json({ msg: "Libro no encontrado" });
    }

    return res.status(200).json({ msg: "Libro eliminado con éxito" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error al eliminar el libro"
    });
  }
};
// ===============================
// SEARCH BUSCAR LIBRO
// ===============================
// ===============================
// SEARCH BUSCAR LIBRO
// ===============================
