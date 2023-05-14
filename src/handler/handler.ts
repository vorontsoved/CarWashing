import { NextFunction, Request, Response, Router } from 'express'
import { signUp, signOut, signIn, refresh, getUsers } from './auth_controller.js'
import { Services } from '../service/service.js'
import { body } from 'express-validator'
import authMiddlewares from '../middlewares/auth-middlewares.js'



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
    routes.post('/api/auth/signIn',
      (req: Request, res: Response, next: NextFunction) => signIn(req, res, this.services.auth, next))
    routes.post('/api/auth/signOut', (req: Request, res: Response, next: NextFunction) => signOut(req, res, this.services.auth, next))
    routes.post('/api/auth/refresh', (req: Request, res: Response, next: NextFunction) => refresh(req, res, this.services.auth, next))
    routes.post('/api/auth/getUsers',
      [authMiddlewares],
      (req: Request, res: Response, next: NextFunction) => getUsers(req, res, this.services.auth, next))
    // routes.post('/api/auth/singIn', (req, res) => singIn(req, res, this.services.auth))

    return routes
  }
}
