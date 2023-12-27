import express, { Application, NextFunction, Response, Request } from "express";
import cors from "express";
import { dbConfig } from "./utils/dbConfig";
import { mainApp } from "./mainApp";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongo from "connect-mongodb-session";

const mongoSession = mongo(session);

const port: number = 2233;
const app: Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

var store = new mongoSession({
  uri: "mongodb://localhost:27017/proDB",
  collection: "session",
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "just-work",
    cookie: {
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 48,
      secure: false,
    },
    store: store,
  })
);

mainApp(app);

const server = app.listen(port, () => {
  console.clear();
  dbConfig();
});

process.on("uncaughtException", (error: Error) => {
  console.log("uncaughtException: ", error);

  process.exit(1);
});
process.on("unhandledRejection", (reason: any) => {
  console.log("ledRejection: ", reason);

  server.close(() => {
    process.exit(1);
  });
});
