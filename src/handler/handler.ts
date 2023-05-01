import { Router } from 'express'
import { singIn } from './auth_controller.js'
import { Services } from '../service/service.js'


interface IHandler {
    services: Services
    initRoutes: (routes: Router, services: Services) => Router
}

export class Handler implements IHandler {
    services: Services
    constructor(services: Services){
        this.services = services
    }

    initRoutes = (routes: Router): Router => {
        routes.use('/api/auth', () => {})
        routes.post('/api/auth/singIn', (req, res) => singIn(req, res, this.services.auth))
        routes.post('/api/auth/singIn', (req, res) => singIn(req, res, this.services.auth))

        return routes
    }
}