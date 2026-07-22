import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const usersRouter = Router();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// ROTA 1: GET /users
usersRouter.get('/', async (req, res) => {
  try {
    const usersPath = path.join(dirname, '..', 'data', 'users.json');
    const data = await fs.readFile(usersPath, 'utf8');
    res.send(JSON.parse(data));
  } catch (error) {

    res.status(500).send({ message: 'Erro ao ler os dados dos utilizadores' });
  }
});


// ROTA 3: GET /users/:id (Exemplo: /users/8340d0ec33270a25f2413b69)
usersRouter.get('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const usersPath = path.join(dirname, '..', 'data', 'users.json');
    const data = await fs.readFile(usersPath, 'utf8');
    const users = JSON.parse(data);

    // O Guia Airbnb exige o uso de _id conforme a exceção configurada
    const user = users.find((item) => item._id === _id);

    if (!user) {
      return res.status(404).send({ message: 'ID do usuário não encontrado' });
    }

    return res.send(user);
  } catch (error) {
    return res.status(500).send({ message: 'Erro interno do servidor' });
  }
});