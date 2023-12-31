"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const data_1 = require("./data");
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(body_parser_1.default.json());
// Get all
app.get('/', (req, res) => {
    res.status(202).json({
        messages: "Success get all transactions data",
        transactions: data_1.transactions
    });
});
// Get all transactions
app.get('/transactions', (req, res) => {
    res.status(202).json({
        messages: "Success get all transactions data",
        transactions: data_1.transactions
    });
});
// Get by ID Transactions
app.get('/transactions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const transaction = data_1.transactions.filter((item) => {
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
    data_1.transactions.push(req.body);
    console.log(data_1.transactions);
    res.json({
        message: "Success adding one new transaction",
        transactions: data_1.transactions
    });
});
// Delete transactions 
app.delete('./transactions/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    const itemToDelete = data_1.transactions.findIndex(transaction => transaction.id == idToDelete);
    if (itemToDelete !== -1) {
        data_1.transactions.splice(itemToDelete, 1);
        res.json({
            message: "Transaction successfully deleted!",
            transactions: data_1.transactions
        });
    }
    else {
        res.status(404).json({
            message: "Transaction not found",
            transactions: data_1.transactions
        });
    }
});
// Put Transactions
app.put('/transactions/:id', (req, res) => {
    const idToUpdate = parseInt(req.params.id);
    const updatedTransaction = req.body;
    const indexToUpdate = data_1.transactions.findIndex(transaction => transaction.id === idToUpdate);
    if (indexToUpdate !== -1) {
        data_1.transactions[indexToUpdate] = updatedTransaction;
        res.json({
            message: `Transaction updated successfully.`,
            transactions: data_1.transactions
        });
    }
    else {
        res.status(404).json({
            message: `Transaction not found.`,
            transactions: data_1.transactions
        });
    }
});
// Patch Transactions
app.patch('./transactions/:id', (req, res) => {
    const idToPatch = parseInt(req.params.id);
    const updatedPatch = req.body;
    const patchedId = data_1.transactions.findIndex(transaction => transaction.id === idToPatch);
    if (patchedId !== -1) {
        data_1.transactions[patchedId] = Object.assign(Object.assign({}, data_1.transactions[patchedId]), updatedPatch);
        res.json({
            message: `Transaction has been patched!`,
            transactions: data_1.transactions
        });
    }
    else {
        res.status(404).json({
            message: `Transaction does not exist`,
            transactions: data_1.transactions
        });
    }
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
