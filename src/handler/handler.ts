import { Router } from 'express'
import { Services } from '../service/service.js'
import { singIn } from './auth_controller.js'


const initRoutes = (routes: Router, services: Services,): Router => {

    routes.get('/api/singIn', (req, res) => singIn(req, res, services))

    return routes
}

export interface Handler {

    initRoutes: (routes: Router, services: Services) => Router
}




export const createNewHandler = (services: Services): Handler => {
    const newHandler: Handler = {
        initRoutes: initRoutes
    }

    return newHandler
}