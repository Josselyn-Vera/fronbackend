import ejemplo from './ejemplo.routes.js';
import televisor from './televisor.routes.js';
import { Router } from 'express';
import libroRoutes from "./libro.routes.js";




const indexRoutes = Router();

indexRoutes.use('/ejemplo', ejemplo);
indexRoutes.use('/televisores', televisor);
indexRoutes.use('/libros', libroRoutes);

export default indexRoutes;

