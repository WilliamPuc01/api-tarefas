import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET!


export function  autenticar(req:Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token){
        res.status(401).json({ erro:"Token não enviado"})
        return
    }
    
    try{
        const payload = jwt.verify(token, SECRET)
        next()

    }catch{
        res.status(401).json({erro:"Token invalido"})
    }
}

