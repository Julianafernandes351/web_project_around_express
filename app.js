import express from 'express';
import { cardsRouter } from './routes/cards.js';
import { usersRouter } from './routes/users.js';


const app = express();
const port = 3000;
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

// ROTA DE EXCEÇÃO: Qualquer outra rota não mapeada (incluindo http://localhost:3000/)
app.use((req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.listen(port, () => {
  // Console.log permitido pela exceção que criámos no ESLint
  console.log(`Servidor a executar em http://localhost:${port}`);
});
