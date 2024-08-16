const request = require("supertest");
let { app } = require("../index.js");
let { fetchAllGames } = require("../controllers/games.js");

const http = require("http");
const { describe } = require("node:test");

jest.mock("../controllers/games.js", () => ({
  ...jest.requireActual("../controllers/games.js"),
  fetchAllGames: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Api testing for game api", () => {
  //Exercise 3: Test Retrieve All Games
  it("/games should return all game data", async () => {
    fetchAllGames.mockResolvedValue([
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ]);
    let res = await request(server).get("/games");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ]);
  });

  //Exercise 4: Test Retrieve Game by ID
  it("/games/details/id should return particular game", async () => {
    let response = await request(server).get("/games/details/1");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      gameId: 1,
      title: "The Legend of Zelda: Breath of the Wild",
      genre: "Adventure",
      platform: "Nintendo Switch",
    });
  });
});

describe("functions testing for game api", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Exercise 5: Mock the Get All Games Function
  it("game function test", async () => {
    let mockedGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];
    fetchAllGames.mockReturnValue(mockedGames);
    let response = await fetchAllGames();
    expect(response).toEqual(mockedGames);
    expect(response.length).toBe(3);
  });
});
