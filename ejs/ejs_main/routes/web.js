import express from 'express'
const router = express.Router();

import { homeController } from '../controllers/Homecontroller.js';


router.get('/',homeController)

export default router;
