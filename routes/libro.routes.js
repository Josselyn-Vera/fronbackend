
import { Router } from "express";
import { 
  getAllLibros,
  getLibroById,
  postLibro,
  putLibro,
  deleteLibro
} from "../controllers/libro.controller.js";

const libro = Router();

libro.get("/", getAllLibros);


libro.get("/:id", getLibroById);
libro.post("/", postLibro);
libro.put("/:id", putLibro);
libro.delete("/:id", deleteLibro);

export default libro;

