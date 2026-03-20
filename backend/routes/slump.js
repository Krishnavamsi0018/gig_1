import express from 'express'
import { predictSlump } from '../controllers/slumpController.js'
const router = express.Router()
router.post('/predict', predictSlump)
export default router
