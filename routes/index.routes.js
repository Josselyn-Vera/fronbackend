import ejemplo from './ejemplo.routes.js';
import televisor from './televisor.routes.js';
import { Router } from 'express';

const indexRoutes = Router();

indexRoutes.use('/ejemplo', ejemplo);
indexRoutes.use('/televisores', televisor);

export default indexRoutes;

