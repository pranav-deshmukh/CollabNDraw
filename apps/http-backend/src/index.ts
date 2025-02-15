import express from "express";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = require('@repo/backend-common/config');
import { middleware } from "./middleware";
import {CreateUserSchema, SignInSchema, CreateRoomSchema} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();

app.post("/signup", (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);
  if(!data.success){
    res.status(400).json({error: data.error.errors});
    return;
  }
  prismaClient.user.create({
    
  })
    res.json({ message: "Signup successful", userId:123 });
});

app.post("/signin", (req, res) => {
  const data = SignInSchema.safeParse(req.body);
  if(!data.success){
    res.status(400).json({error: data.error.errors});
    return;
  }
  const userId = 1;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({ token });
});

app.post("/room", middleware, (req, res) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if(!data.success){
    res.status(400).json({error: data.error.errors});
    return;
  }
  res.json({ message: "Room created", roomId: 123 });
});

app.listen(3005, () => {
  console.log("Server is running on port 3005");
});
