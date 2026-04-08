import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import tarefasRouter from './routes/tarefas.router'
import authRouter from './routes/auth.router'
import { autenticar } from './middlewares/autenticar'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.json({ mensagem: "API de Tarefas!" })
})

app.use('/auth', authRouter)
app.use('/tarefas', autenticar, tarefasRouter)

// Tratamento de erros global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message)
  res.status(500).json({ erro: "Erro interno do servidor" })
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})