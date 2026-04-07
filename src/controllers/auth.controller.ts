import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../prisma'

const SECRET = process.env.JWT_SECRET!

export async function register(req:Request, res: Response): Promise<void> {
    const {email, senha} = req.body

    if(!email || !senha){
        res.status(401).json({ erro: "Campos vazios entre email ou a senha"})
    }

    const usuarioExistente = await prisma.usuario.findUnique({
        where: { email}
    })

    if(usuarioExistente){
        res.status(401).json({erro: "Email cadastrado"})
    }

    const senhaHash =  await bcrypt.hash(senha, 10)

    const criarUsuario = await prisma.usuario.create({
        data: {email, senha: senhaHash}
    })
    
    res.status(201).json({id:criarUsuario.id, email:criarUsuario.email})
}




export async function login(req: Request, res: Response): Promise<void> {
  const { email, senha } = req.body

  if (!email || !senha) {
    res.status(400).json({ erro: "Email e senha obrigatórios" })
    return
  }

  const usuario = await prisma.usuario.findUnique({
    where: { email }
  })

  if (!usuario) {
    res.status(401).json({ erro: "Email ou senha inválidos" })
    return
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

  if (!senhaCorreta) {
    res.status(401).json({ erro: "Email ou senha inválidos" })
    return
  }

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, {
    expiresIn: '1d'
  })

  res.json({ token })
}