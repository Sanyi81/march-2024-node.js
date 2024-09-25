import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api-error";
import { userRouter } from "./routers/user.router";
import { read, write } from "./services/fs.service";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.put(
  "/users/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);
      const { name, email, password } = req.body;

      if (!name || name.length < 3) {
        throw new ApiError("Name cannot be empty", 400);
      }
      if (!email || !email.includes("@")) {
        throw new ApiError("Email cannot be empty", 404);
      }
      if (!password || password.length < 6) {
        throw new ApiError("Password cannot be empty", 400);
      }
      const users = await read();

      const userIndex = users.findIndex((user) => user.id === userId);
      if (userIndex === -1) {
        throw new ApiError("User Not Found", 404);
      }
      users[userIndex].name = name;
      users[userIndex].email = email;
      users[userIndex].password = password;

      await write(users);
      res.status(201).send(users[userIndex]);
    } catch (e) {
      next(e);
    }
  },
);

app.delete(
  "/users/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);
      const users = await read();

      const userIndex = users.findIndex((user) => user.id === userId);
      if (userIndex === -1) {
        throw new ApiError("User Not Found", 404);
      }
      users.splice(userIndex, 1);

      await write(users);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
);

app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).send(error.message);
  },
);

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
  process.exit(1);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
