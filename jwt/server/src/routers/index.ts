import express from 'express'
import { body } from 'express-validator'

import { createController } from '../controllers'
import { userController } from '../controllers/user.controller'

const router = express.Router()

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  createController(userController.registration)
)
router.post('/login', createController(userController.login))
router.post('/logout', createController(userController.logout))
router.get('/activate/:link', createController(userController.activate))
router.get('/refresh', createController(userController.refresh))
router.get('/users', createController(userController.getUsers))

export = router
