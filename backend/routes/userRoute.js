import express from 'express';
import { getProfile, login, logout, refreshAccessToken, register } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.get("/refresh",refreshAccessToken);
router.get("/logout",logout);
router.get("/profile",isAuthenticated,roleMiddleware('ADMIN','STUDENT','TRAINER'),getProfile);

export default router;