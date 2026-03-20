import express from 'express'
import { calculateBenefits } from '../controllers/benefitsController.js'
const router = express.Router()
router.post('/calculate', calculateBenefits)
export default router
