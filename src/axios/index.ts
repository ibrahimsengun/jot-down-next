import axios from "axios";

const api_key =
  "XRmtsHZKxbPW8yQVeZmkIBYDaLLqpOfEj3sD1Rbbmz1N4aJ7mfvihlx7AISsYdBB";

export const MongoClient = axios.create({
  baseURL:
    "https://data.mongodb-api.com/app/data-odjty/endpoint/data/v1/action/",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key": api_key,
  },
});

export const NextAPI = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 60000,
});
