import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { transactions } from "./data";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

const transaction: Transaction[] = [];

// Get all transactions
app.get('/transactions', (req, res) => {
  res.status(200).json({
    messages: "Success get all transactions data",
    transactions
  });
});

// Get by ID Transactions
app.get('/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id); 
  const transaction = transactions.filter((item: any) => {
    console.log(item);
    return item.id == req.params.id;
  });

  if (transaction.length != 0) {
  res.json({
    message: "Success get transactions by id",
    transaction
  });
} else {
  res.json({
    message: "Failed getting transactions by id",
    transaction
  })
 }
});

// Post
app.post('/transactions', (req, res) => {
  console.log(req.body);
  
  transactions.push(req.body);
  console.log(transactions);

  res.json({
    message: "Success adding one new transaction",
    transactions
  })
});

// Delete
app.delete('/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  const transaction = transactions.filter((transaction) => transaction.id !== id);

  if (transaction.length != 0) {
    res.json({
      message: "Transaction deleted successfully",
      transaction
      });
  } else {
    res.json({
      message: "Failed getting transactions by id",
      transaction
    })
   }
});

// Put
app.put('/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { type, name, detail, amount } = req.body;

  const transactionResult = transactions.find(transaction => transaction.id === id);

  if (transactionResult < 0) {
    return res.status(404).json({ message: 'Not found' });
  }

  transactions[transactionResult] = {
    id,
    type: type || transactions[transactionResult].type,
    name: name || transactions[transactionResult].name,
    detail: detail || transactions[transactionResult].detail,
    amount: amount || transactions[transactionResult].amount
  };

  res.json({ message: 'Transaction updated!', updatedTransaction: transactions[transactionResult] });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});