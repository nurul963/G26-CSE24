import express from 'express';
import { getAllUsers } from '../controllers/admin.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
const router=express.Router();
router.get("/",isAuthenticated,roleMiddleware('ADMIN'), getAllUsers);

export default router;