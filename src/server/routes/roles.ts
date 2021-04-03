import type { Express } from 'express';
import DatabaseHandler from '../db';
import auth from '../helpers/auth';

export const roleRoutes = (app: Express, DB: DatabaseHandler) => {
  app.route("/roles")
    .get(auth, async (req, res) => {
      res.send(await DB.getRoles()).end();
    })
}