const express = require("express");
let {
  fetchAllGames,
  fetchGameById,
} = require("./controllers/games.js");
const app = express();
app.use(express.json());

//Exercise 1: Retrieve All Games
app.get("/games", async (req, res) => {
  try {
    let game = await fetchAllGames();
    if (game.length === 0)
      return res.status(404).json({ message: "No games found" });
    return res.status(200).json(game);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Exercise 2: Retrieve Game by ID
app.get("/games/details/:id", async (req, res) => {
  try {
    let game = await fetchGameById(parseInt(req.params.id));
    if (!game)
      return res
        .status(404)
        .json({ message: "No game found for id" + req.params.id });
    return res.status(200).json(game);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = { app };
