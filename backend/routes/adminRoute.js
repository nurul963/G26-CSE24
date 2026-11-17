import express from 'express';
import { getAllUsers } from '../controllers/admin.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
const router=express.Router();
router.get("/",isAuthenticated, getAllUsers);

export default router;