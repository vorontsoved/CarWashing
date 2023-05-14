import { NextFunction, Request, Response } from 'express'
import { IAuthService } from '../service/service.js'
import { validationResult } from 'express-validator/src/validation-result.js';
import { ApiError } from '../exceptions/api-error.js';
import Context from '../utils/context.js';


export const signUp = async (req: Request, res: Response, auth: IAuthService, next: NextFunction): Promise<any> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
    }
    const { login, password } = req.body
    const password_hash = password.toString()
    const result = await auth.signUp(login, password_hash)
    res.cookie('refresh_token', result.data.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    res.status(200).json({ message: 'Успешно зарегестрирован', userParams: result })
  } catch (error) {
    next(error)
  }
}

export const signIn = async (req: Request, res: Response, auth: IAuthService, next: NextFunction): Promise<any> => {
  try {
    const { login, password } = req.body
    const password_hash = password.toString()
    const result = await auth.signIn(login, password_hash)
    res.cookie('refresh_token', result.data.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    res.status(200).json({ message: 'Вы авторизованы', userParams: result })
  } catch (error) {
    next(error)
  }
}

export const signOut = async (req: Request, res: Response, auth: IAuthService, next: NextFunction): Promise<any> => {
  try {
    const { refresh_token } = req.cookies
    
    if (!refresh_token) {
      return next(ApiError.BadRequest('Токен не найден'))
    }
    const result = await auth.signOut(refresh_token)
    res.clearCookie('refresh_token')
    res.status(200).json({ message: 'Вы вышли', userParams: result })
  } catch (error) {
    next(error)
  }
}

export const refresh = async (req: Request, res: Response, auth: IAuthService, next: NextFunction): Promise<any> => {
  try {
    const { refresh_token } = req.cookies
   
    const result = await auth.refresh(refresh_token)
    res.cookie('refresh_token', result.data.refresh_token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    res.status(200).json({ message: 'Токен обновился', userParams: result })
  } catch (error) {
    next(error)
  }
}

export const getUsers = async (req: Request, res: Response, auth: IAuthService, next: NextFunction): Promise<any> => {
  try {
    const us = Context.get(req)?.get('user')
    console.log('Пользователь', us);
    
    const users = await auth.getUsers()
    res.status(200).json({ message: 'Все пользователи', userParams: users })
  } catch (error) {
    next(error)
  }
}
