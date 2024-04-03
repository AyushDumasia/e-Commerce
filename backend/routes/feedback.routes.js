import express from 'express'
import validateToken from './../middlewares/validateUser.js'
import {
    createFeedback,
    fetchFeedback,
} from '../controllers/feedback.controller.js'
const router = express.Router()

router.post('/createFeedback', validateToken, createFeedback)

router.get('/fetchFeedback/:id', fetchFeedback)

export default router
