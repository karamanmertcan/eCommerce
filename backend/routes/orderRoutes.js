import express from 'express';
const router = express.Router();
import { addOrderItems } from '../controllers/orderController.js';
import { getOrderById, updateOrderToPaid, getMyOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/myorders').get(protect, getMyOrders);
router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(updateOrderToPaid);

export default router;
