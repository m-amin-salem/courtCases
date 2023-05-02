import express, { NextFunction, Request, Response } from 'express';
import { CaseDto } from './case.dto.';
import { getCases, setCounter, generateFxFileId, addNewCase } from './helpers'

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/case', (req: Request, res: Response) => {
  const cases = getCases()
  const counter = setCounter(cases)
  const currentYear = new Date().getFullYear().toString().substr(-2)
  const fxFileId = generateFxFileId(req.body.customerName, currentYear, counter);
  const newCase: CaseDto = { ...req.body, fxFileId };
  
  addNewCase(newCase, cases)

  res.send(newCase);
});

app.get('/api/allcases', (req: Request, res: Response) => {
  const cases = getCases()

  res.send(cases);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});