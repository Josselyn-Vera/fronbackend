import mongoose from "mongoose";

const LibroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  categoria: { type: String, required: true },
  año: { type: Number, required: true },
  portada: { type: String, required: true }
});

export default mongoose.model("Libro", LibroSchema);
