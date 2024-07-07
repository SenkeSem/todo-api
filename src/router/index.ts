import express from "express";

import authentication from "./authentication";
import todos from "./todos";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  todos(router);

  return router;
}