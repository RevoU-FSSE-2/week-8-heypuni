"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(body_parser_1.default.json());
const transactions = [];
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
    const transaction = transactions.filter((item) => {
        console.log(item);
        return item.id == req.params.id;
    });
    if (transaction.length != 0) {
        res.json({
            message: "Success get transactions by id",
            transaction
        });
    }
    else {
        res.json({
            message: "Failed getting transactions by id",
            transaction
        });
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
    });
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
    }
    else {
        res.json({
            message: "Failed getting transactions by id",
            transaction
        });
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
