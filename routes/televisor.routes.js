import { Router } from 'express';
import {
  getAllTelevisores,
  getTelevisorById,
  postTelevisor,
  putTelevisor,
  deleteTelevisor
} from '../controllers/televisor.controller.js';

const televisor = Router();

// GET todos
televisor.get('/', getAllTelevisores);

// GET por ID
televisor.get('/:id', getTelevisorById);

// POST
televisor.post('/', postTelevisor);

// PUT
televisor.put('/:id', putTelevisor);

// DELETE
televisor.delete('/:id', deleteTelevisor);

export default televisor;
