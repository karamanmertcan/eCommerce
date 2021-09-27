import express from 'express';
const router = express.Router();
import { stripePayment } from '../controllers/stripeController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, stripePayment);

export default router;
