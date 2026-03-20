import express from 'express'
import { generatePassport, getPassport } from '../controllers/passportController.js'
const router = express.Router()
router.post('/generate', generatePassport)
router.get('/:id', getPassport)
export default router
