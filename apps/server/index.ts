import express from 'express';
import {sumWithSteps} from "./lib/sum-with-steps";
import cors from 'cors';

const app = express();

app.use(express.json());

// cors
app.use(cors({
  origin: '*',
}));
app.post('/api/sum', (req, res) => {
  if (!req.body) return res.status(400).send({
    error: "Invalid request body"
  });

  const a = req.body.a;
  const b = req.body.b;

  // validate a and b to be positive integers
  if (typeof a !== 'number' || typeof b !== 'number' || a < 0 || b < 0) {
    return res.status(400).send({
      error: 'a and b must be positive integers',
    });
  }

  const sum = a + b;

  const result = {
    sum: sum,
    steps: sumWithSteps(+a, +b),
  }

  return res.send(result);
})

app.listen(4000, () => {
  console.log('Express app listening on port 4000!');
})
