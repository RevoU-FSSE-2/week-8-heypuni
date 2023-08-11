"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(body_parser_1.default.json());
let movies = [
    {
        id: 1,
        title: "Fight Club",
    },
    {
        id: 2,
        title: "Spiderman",
    },
    {
        id: 3,
        title: "Ironman",
    },
    {
        id: 4,
        title: "Mulan",
    },
    {
        id: 5,
        title: "Oppenheimer",
    },
];
app.get("/", (req, res) => {
    res.send("selamat datang, gunakan endpoint /movies");
});
// GET ALL MOVIES
app.get("/movies", (req, res) => {
    res.json({
        message: "success get data movies",
        movies,
    });
});
// GET MOVIE BY ID
// app.get("/movies/:id", (req, res) => {
//   const movie = movies.filter((item: any) => item.id === req.params.id);
//   if (movie.length != 0) {
//     res.json({
//       message: "success get data movie",
//       movie,
//     });
//   } else {
//     res.json({
//       message: "cannot find data movie",
//     });
//   }
// });
// GET MOVIE BY ID without any
app.get("/movies/:id", (req, res) => {
    const movieId = parseInt(req.params.id, 10);
    if (!Number.isNaN(movieId)) {
        let movie = movies.filter((item) => item.id === movieId);
        if (movie.length !== 0) {
            res.json({
                message: "success get data movie",
                movie,
            });
        }
        else {
            res.json({
                message: "cannot find data movie",
            });
        }
    }
    else {
        res.json({
            message: "invalid movie ID",
        });
    }
});
// POST MOVIE
app.post("/movies", (req, res) => {
    console.log(req.body);
    let movie = {
        id: movies[movies.length - 1].id + 1,
        title: req.body.title,
    };
    movies.push(movie);
    res.json({
        message: "succcess adding one movie",
        movies,
    });
});
// Not Found
app.get("*", (req, res) => {
    let body = `<h1>Maaf halaman tidak ditemukan</h1>`;
    res.send(body);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
