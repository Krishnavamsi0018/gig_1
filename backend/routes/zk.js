import express from 'express'
import { generateProof, verifyProof } from '../controllers/zkController.js'
const router = express.Router()
router.post('/generate-proof', generateProof)
router.post('/verify', verifyProof)
export default router
