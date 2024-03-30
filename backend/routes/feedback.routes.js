import express from 'express'
import validateToken from './../middlewares/validateUser.js'
import {createFeedback} from '../controllers/feedback.controller.js'

router.post('/createFeedback', validateToken, createFeedback)
