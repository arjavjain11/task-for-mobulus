import express from 'express';
import { login, signUp } from '../controllers/user/auth.js';
import { createOrder, findData, getProducts } from '../controllers/user/order.js';
import { adminLogin } from '../controllers/admin/auth.js';
import { orderStatusUpdate, productManagment, updateUserStatus } from '../controllers/admin/home.js';

const router = express.Router();

router.post('/user/login', login);
router.post('/user/signup', signUp);
router.get('/user/data', findData);
router.get('/user/products', getProducts);
router.post('/user/order', createOrder);
router.post('/admin/login', adminLogin);
router.put('/admin/home', updateUserStatus);
router.put('/admin/updateOrderStatus', orderStatusUpdate);
router.post('/admin/product', productManagment)

export default router;
