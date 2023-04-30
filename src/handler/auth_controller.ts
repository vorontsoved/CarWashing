import { Request, Response } from "express";
import { Services } from "../service/service.js";



export const singIn = (req: Request, res: Response, services: Services): void => {
    let { login, password } = req.body;
    const { token, error } = services.auth.signIn(login, password)
    if (error !== null) {
        res.status(400).json('Error message')
    } else {
        res.status(200).json({ token })
    }
}