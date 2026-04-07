import { Request, Response } from 'express'
import prisma from '../prisma'
import { z } from 'zod'

const tarefaSchema = z.object({
  titulo: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  descricao: z.string().min(5, "Descrição deve ter no mínimo 5 caracteres")
})

export async function listarTarefas(req: Request, res: Response): Promise<void> {
  const tarefas = await prisma.tarefa.findMany()
  res.json(tarefas)
}

export async function buscarTarefa(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const tarefa = await prisma.tarefa.findUnique({
    where: { id: Number(id) }
  })

  if (!tarefa) {
    res.status(404).json({ erro: "Tarefa não encontrada" })
    return
  }

  res.json(tarefa)
}

export async function criarTarefa(req: Request, res: Response): Promise<void> {
  const resultado = tarefaSchema.safeParse(req.body)

  if (!resultado.success) {
    res.status(400).json({ erros: resultado.error.flatten().fieldErrors })
    return
  }

  const { titulo, descricao } = resultado.data

  const novaTarefa = await prisma.tarefa.create({
    data: { titulo, descricao }
  })

  res.status(201).json(novaTarefa)
}

export async function atualizarTarefa(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const tarefa = await prisma.tarefa.findUnique({
    where: { id: Number(id) }
  })

  if (!tarefa) {
    res.status(404).json({ erro: "Tarefa não encontrada" })
    return
  }

  const atualizada = await prisma.tarefa.update({
    where: { id: Number(id) },
    data: req.body
  })

  res.json(atualizada)
}

export async function deletarTarefa(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  const tarefa = await prisma.tarefa.findUnique({
    where: { id: Number(id) }
  })

  if (!tarefa) {
    res.status(404).json({ erro: "Tarefa não encontrada" })
    return
  }

  await prisma.tarefa.delete({
    where: { id: Number(id) }
  })

  res.status(204).send()
}