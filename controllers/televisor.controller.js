import Televisor from '../models/televisor.model.js';
import mongoose from "mongoose";
import express from 'express';

// GET TODOS LOS TELEVISOROS
export const getAllTelevisores = async (req, res) => {
  console.log('Obtiene todos los televisores');
  try {
    const televisores = await Televisor.find({}, { __v: 0 });

    if (televisores.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron televisores' });
    }

    return res.status(200).json({ televisores });

  } catch (error) {
    return res.status(500).json({ msg: 'Error al obtener los televisores' });
  }
};

// GET POR ID
export const getTelevisorById = async (req, res) => {
  console.log('TELEVISOR POR ID');
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const televisor = await Televisor.findById(id);

    if (!televisor) {
      return res.status(404).json({ msg: 'Televisor no encontrado' });
    }

    return res.status(200).json({ televisor });

  } catch (error) {
    return res.status(500).json({ msg: 'Error al obtener el televisor' });
  }
};

// POST CREAR TELEVISOR
export const postTelevisor = async (req, res) => {
  console.log('POST TELEVISOR');
  const body = req.body;
  const televisor = new Televisor(body);

  try {
    // Validar campos antes de guardar
    const validationError = televisor.validateSync();
    if (validationError) {
      const errorMessages = Object.values(validationError.errors).map(
        (error) => error.message
      );
      return res.status(400).json({ error: errorMessages });
    }

    await televisor.save();

    return res.status(201).json({ televisor });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al guardar el televisor' });
  }
};

// PUT ACTUALIZAR TELEVISOR
export const putTelevisor = async (req, res) => {
  console.log('PUT TELEVISOR');
  const id = req.params.id;
  const body = req.body;

  try {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID no válido' });
    }

    const televisor = await Televisor.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!televisor) {
      return res.status(404).json({ msg: 'Televisor no encontrado' });
    }

    return res.status(200).json({ televisor });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Error al actualizar el televisor' });
  }
};

// DELETE ELIMINAR TELEVISOR
export const deleteTelevisor = async (req, res) => {
  console.log("DELETE TELEVISOR");
  const id = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "ID no válido" });
    }

    const televisor = await Televisor.findByIdAndDelete(id);
    if (!televisor) {
      return res.status(404).json({ msg: "Televisor no encontrado" });
    }

    return res.status(200).json({ msg: "Televisor eliminado con éxito", televisor });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error al eliminar el televisor" });
  }
};
