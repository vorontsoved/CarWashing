import { NextFunction, Request, Response } from 'express'
import { IAuthService, Services } from '../service/service.js'
import { IResp } from '../service/service.js'
import { validationResult } from 'express-validator/src/validation-result.js';
import { ApiError } from '../exceptions/api-error.js';


export const signUp = async (req: Request, res: Response, auth: IAuthService, next: NextFunction): Promise<any> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
    }
    const { login, password } = req.body
    const password_hash = password.toString()
    const result = await auth.signUp(login, password_hash)
    res.status(200).json({ message: 'Успешно зарегестрирован', userParams: result })
  } catch (error) {
    next(error)
  }
}
export const signIn = async (req: Request, res: Response, auth: IAuthService): Promise<any> => {
  try {
    const { login, password } = req.body
    const password_hash = password.toString()
    const result = await auth.signIn(login, password_hash)
    res.status(200).json({ message: 'Успешно зарегестрирован', userParams: result })
  } catch (error) {
    
  }
}
export const checkU = async (req: Request, res: Response, auth: IAuthService): Promise<void> => {
  //   const { login, password } = req.body
  //   const { data, error } = await auth.check(login)
  //   if (error !== null) {
  //     res.status(400).json('Error message')
  //   } else {
  //     res.status(200).json({ token })
  //   }
}
