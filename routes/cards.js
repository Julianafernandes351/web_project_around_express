import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';

export const cardsRouter = Router();
const filename = new URL(import.meta.url).pathname;
const dirname = path.dirname(filename);

const cardsPath = path.join(dirname, '..', 'data', 'cards.json');


// ROTA 2: GET /cards
cardsRouter.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(cardsPath, 'utf8');
    res.send(JSON.parse(data));
  } catch (error) {
    res.status(500).send({ message: 'Erro ao ler os dados dos cartões' });
  }
});