import express from 'express'
import { getUser, Login, Register } from '../Controller/auth.conroller.js'

const router = express.Router()

router.post("/register",Register);
router.post("/login",Login)
router.get("/getuser",getUser)

export default router