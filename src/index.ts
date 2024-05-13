import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

const app = express();
app.use(express.json())
app.use(cors());


app.get("/health", async (req: Request, res: Response) => {
  res.json({message: "health OK!"});
});
//whenever we receive request from /api/my/user it will forward the request to myUserRoute, if the request is post request it will forward to MyUserController it will pass to createCurrentUser function
app.use("/api/my/user", myUserRoute)

app.listen(7000, ()=> {
  console.log("server started on localhost:7000");
})