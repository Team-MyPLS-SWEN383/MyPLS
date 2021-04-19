import type { Express } from 'express';
import DatabaseHandler from '../db';
import auth, { profAuth } from '../helpers/auth';
import { toMySqlDate } from '../helpers/dateToMySql';

export const lectureRoutes = (app: Express, DB: DatabaseHandler) => {
  app.route("/lectures")
  .get(async (req, res) => {
    return res.send(await DB.getLectures()).end();
  })
  .post(profAuth, async (req, res) => {
    const { title, summary, UnlockDate, coursename } = req.body;
    await DB.createLecture(title, summary, toMySqlDate(UnlockDate), await DB.getCourseId(coursename));
    res.status(200);
    res.redirect("/instructor");
  })
  .delete(profAuth, async (req, res) => {
    const { title } = req.body;
    await DB.deleteLecture(title);
    res.redirect(".");
  })
  .patch(profAuth, async (req, res) => {
    const { title, summary, UnlockDate, coursename } = req.body;
    await DB.updateLecture(title, summary, toMySqlDate(UnlockDate), await DB.getCourseId(coursename));
    res.status(200);
    res.redirect(".");
  })
}