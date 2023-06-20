import Router from 'express';
import controller from '../contollers/income.controller.js';
const router = new Router();

router.get('/', controller.getIncome);
router.post('/', controller.createIncome);
router.delete('/', controller.deleteIncome);

export default router;
