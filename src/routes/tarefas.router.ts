import { Router } from 'express'
import { listarTarefas, buscarTarefa, criarTarefa, atualizarTarefa, deletarTarefa } from '../controllers/tarefas.controller'

const router = Router()

router.get('/', listarTarefas)
router.get('/:id', buscarTarefa)
router.post('/', criarTarefa)
router.put('/:id', atualizarTarefa)
router.delete('/:id', deletarTarefa)

export default router