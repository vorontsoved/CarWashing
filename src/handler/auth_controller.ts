import { Request, Response } from "express";
import { IAuthService, Services } from "../service/service.js";



export const singIn = (req: Request, res: Response, auth: IAuthService): void => {
    // const { login, password } = req.body;
    // const { token, error } = auth.signIn(login, password)
    // if (error !== null) {
    //     res.status(400).json('Error message')
    // } else {
    //     res.status(200).json({ token })
    // }
    // res.status(200).json({status: 'ok'})
}
export const checkU = (req: Request, res: Response, auth: IAuthService): void => {
    const { login, password } = req.body;
    const { token, error } = auth.check(login, password)
    if (error !== null) {
        res.status(400).json('Error message')
    } else {
        res.status(200).json({ token })
    }
    res.status(200).json({status: 'ok'})
}

export const signUp = (req: Request, res: Response, auth: IAuthService): void => {
    res.status(200).json({status: 'ok'})
}