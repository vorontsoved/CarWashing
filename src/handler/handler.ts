import { NextFunction, Request, Response, Router } from 'express'
import { signUp, checkU, signIn } from './auth_controller.js'
import { Services } from '../service/service.js'
import { body } from 'express-validator'

interface IHandler {
  services: Services
  initRoutes: (routes: Router, services: Services) => Router
}

const validateSignUp = [
  body('login').matches(/^(?:\w+@\w+\.\w+|\d{11})$/i),
  body('password').isLength({ min: 3, max: 32 }),
];

export class Handler implements IHandler {
  services: Services
  constructor(services: Services) {
    this.services = services
  }

  initRoutes = (routes: Router): Router => {
    // routes.use('/api/auth', () => {console.log})
    routes.post('/api/auth/signUp',
      validateSignUp,
      (req: Request, res: Response, next: NextFunction) => signUp(req, res, this.services.auth, next))
    routes.post('/api/auth/signIn', (req: Request, res: Response) => signIn(req, res, this.services.auth))
    routes.post('/api/auth/check', (req: Request, res: Response) => checkU(req, res, this.services.auth))
    // routes.post('/api/auth/singIn', (req, res) => singIn(req, res, this.services.auth))

    return routes
  }
}
