import express from 'express';
import { login, signUp } from '../controllers/user/auth.js';
import { createOrder, findData } from '../controllers/user/order.js';
import { adminLogin } from '../controllers/admin/auth.js';
import { home } from '../controllers/admin/home.js';

const router = express.Router();

router.post('/user/login', login);
router.post('/user/signup', signUp);
router.get('/user/data', findData);
router.post('/user/order', createOrder);
router.post('/admin/login', adminLogin);
router.post('/admin/home', home);

export default router;
