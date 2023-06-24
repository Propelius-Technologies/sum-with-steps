import 'dotenv/config'

import express from 'express';
import {sumWithSteps} from "./lib/sum-with-steps";
import cors from 'cors';
import {db, sumLogs} from "./lib/db/schema";
import {sql} from "drizzle-orm";

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

  const num1 = req.body.num1;
  const num2 = req.body.num1;

  // validate num1 and num2 to be positive integers
  if (typeof num1 !== 'number' || typeof num2 !== 'number' || num1 < 0 || num2 < 0) {
    return res.status(400).send({
      error: 'num1 and num2 must be positive integers',
    });
  }

  const sum = num1 + num2;

  const result = {
    sum,
    steps: sumWithSteps(+num1, +num2),
  }

  return res.send(result);
})

app.post('/api/sum-logs', async (req, res) => {
  if (!req.body) return res.status(400).send({
    error: "Invalid request body"
  });

  const num1 = req.body.num1;
  const num2 = req.body.num2;

  // validate num1 and num2 to be positive integers
  if (typeof num1 !== 'number' || typeof num2 !== 'number' || num1 < 0 || num2 < 0) {
    return res.status(400).send({
      error: 'num1 and num2 must be positive integers',
    });
  }

  const steps = sumWithSteps(+num1, +num2);

  await db.insert(sumLogs).values({
    first_number: num1,
    steps,
    second_number: num2,
  })

  return res.send({
    success: true,
  });
});

app.get('/api/sum-logs', async (req, res) => {
  let page: number = Number(req.query.page as string);
  let limit: number = Number(req.query.limit as string);

  if (isNaN(page) || page < 1) {
    page = 1;
  }

  if (isNaN(limit) || limit < 1) {
    limit = 10;
  }

  try {
    const records = await db.select({
      id: sumLogs.id,
      first_number: sumLogs.first_number,
      second_number: sumLogs.second_number,
      steps: sumLogs.steps,
    })
      .from(sumLogs)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(sumLogs.id);

    const total = await db.select({
      count: sql<number>`count(*)`.mapWith(Number)
    })
      .from(sumLogs)

    return res.send({
      records,
      total: total[0].count,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).send({
      error: 'Internal server error',
    });
  }
});

app.listen(4000, () => {
  console.log('Express app listening on port 4000!');
})
