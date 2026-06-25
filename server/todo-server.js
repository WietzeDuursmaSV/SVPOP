import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let todos = {
  name: '',
  pressent: '',
  date: '',
  next: 'TODO 1',
  requirements: 'TODO 2',
  compass: 'TODO 3',
  afspraken: '',
};

app.get('/api/todos', (_req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { next, requirements, compass, todo1, todo2, todo3, name, pressent, date, afspraken } =
    req.body ?? {};

  const nextValue = typeof next === 'string' ? next : todo1;
  const requirementsValue = typeof requirements === 'string' ? requirements : todo2;
  const compassValue = typeof compass === 'string' ? compass : todo3;

  todos = {
    name: typeof name === 'string' ? name : todos.name,
    pressent: typeof pressent === 'string' ? pressent : todos.pressent,
    date: typeof date === 'string' ? date : todos.date,
    next: typeof nextValue === 'string' ? nextValue : todos.next,
    requirements: typeof requirementsValue === 'string' ? requirementsValue : todos.requirements,
    compass: typeof compassValue === 'string' ? compassValue : todos.compass,
    afspraken: typeof afspraken === 'string' ? afspraken : todos.afspraken,
  };

  res.json({ ok: true, todos });
});

app.listen(PORT, () => {
  console.log(`Todo API running on http://localhost:${PORT}`);
});
