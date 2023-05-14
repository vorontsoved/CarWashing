import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/api-error.js";
import { AuthService } from "../service/Auth.js";
import Context from "../utils/context.js";


export default function (req: Request, res: Response, next: NextFunction): void {
    try {
        const authorization = req.headers.authorization;
        const accessToken = authorization?.split(' ')[1]
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }
        const userData = AuthService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }
        Context.get(req)?.set('user', userData)
        next()
    } catch (error) {
        return next(ApiError.UnauthorizedError())
    }
}