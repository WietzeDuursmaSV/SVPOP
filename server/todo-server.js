import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let todos = {
  todo1: 'TODO 1',
  todo2: 'TODO 2',
  todo3: 'TODO 3'
};

app.get('/api/todos', (_req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { todo1, todo2, todo3 } = req.body ?? {};

  todos = {
    todo1: typeof todo1 === 'string' ? todo1 : todos.todo1,
    todo2: typeof todo2 === 'string' ? todo2 : todos.todo2,
    todo3: typeof todo3 === 'string' ? todo3 : todos.todo3
  };

  res.json({ ok: true, todos });
});

app.listen(PORT, () => {
  console.log(`Todo API running on http://localhost:${PORT}`);
});
