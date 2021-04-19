import type { Express } from 'express';
import DatabaseHandler from '../db';
import auth, { profAuth } from '../helpers/auth';
import { toMySqlDate } from '../helpers/dateToMySql';

export const quizRoutes = (app: Express, DB: DatabaseHandler) => {
  app.route("/quizzes")
  .get(async (req, res) => {
    return res.send(await DB.getQuizzes()).end();
  })
  .post(profAuth, async (req, res) => {
    const { Title, StartTime, EndTime, title } = req.body;
    await DB.createQuiz(Title, toMySqlDate(StartTime), toMySqlDate(EndTime), await DB.getLectureId(title));
    res.status(200);
    res.redirect(".");
  })
  .delete(profAuth, async (req, res) => {
    const { Title } = req.body;
    await DB.deleteQuiz(Title);
    res.redirect(".");
  })
  .patch(profAuth, async (req, res) => {
    const { Title, StartTime, EndTime } = req.body;
    await DB.updateQuiz(Title, toMySqlDate(StartTime), toMySqlDate(EndTime));
    res.status(200);
    res.redirect(".");
  })
}