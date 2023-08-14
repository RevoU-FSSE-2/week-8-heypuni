import express, { Express } from "express";
import dotenv from "dotenv";

import { transactions } from "./data";
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

// Get all
app.get('/', (req, res) => {
  res.status(202).json({
    messages: "Success get all transactions data",
    transactions
  });
});

// Get all transactions
app.get('/transactions', (req, res) => {
  res.status(202).json({
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

// Delete transactions 
app.delete('./transactions/:id', (req, res) => {
  const idToDelete = parseInt(req.params.id);
  const itemToDelete = transactions.findIndex(transaction => transaction.id == idToDelete);

  if (itemToDelete !== -1) {
      transactions.splice(itemToDelete, 1);
      res.json({
          message: "Transaction successfully deleted!",
          transactions
      })
  } else {
      res.status(404).json({
          message: "Transaction not found",
          transactions
      })
  }
});

// Put Transactions
app.put('/transactions/:id', (req, res) => {
  const idToUpdate = parseInt(req.params.id);
  const updatedTransaction = req.body;

  const indexToUpdate = transactions.findIndex(transaction => transaction.id === idToUpdate);

  if (indexToUpdate !== -1) {
      transactions[indexToUpdate] = updatedTransaction;
      res.json({
          message: `Transaction updated successfully.`,
          transactions
      });
  } else {
      res.status(404).json({
          message: `Transaction not found.`,
          transactions
      });
  }
});

// Patch Transactions
app.patch('./transactions/:id', (req, res) => {
  const idToPatch = parseInt(req.params.id);
  const updatedPatch = req.body;

  const patchedId = transactions.findIndex(transaction => transaction.id === idToPatch);

  if (patchedId !== -1) {
      transactions[patchedId] = { ...transactions[patchedId], ...updatedPatch };
      res.json({
          message: `Transaction has been patched!`,
          transactions
      })
  } else {
      res.status(404).json({
          message: `Transaction does not exist`,
          transactions
      })
  }
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
