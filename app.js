import express from "express";
import bodyParser from "body-parser";
import router from "./src/router/index.js";
import cors from 'cors';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // request parser

app.use(cors({ credentials: true, origin: true }));

app.use(router);

// page not found middleware
app.use((req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
});

// Internal server error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
