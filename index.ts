import express from "express";
import server from "./routes/allRoute";
import cors from "cors";

server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:5173", // অথবা তোমার frontend URL
  })
);
server.listen(3000, (err?: Error) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running on port 3000");
  }
});
