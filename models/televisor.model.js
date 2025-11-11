import mongoose from "mongoose";

const televisorSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  tamaño: {
    type: Number, // en pulgadas
    required: true,
  },
  resolucion: {
    type: String,
    required: true, // Ej: "4K", "8K", "Full HD"
  },
  tipo: {
    type: String, // LED, OLED, QLED, etc.
    required: false,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: false,
    default: 0
  },
  caracteristicas: {
    type: [String], // Lista de características (Smart TV, HDR, WiFi, etc.)
    required: false,
  }
});

const Televisor = mongoose.model("Televisor", televisorSchema);

export default Televisor;
