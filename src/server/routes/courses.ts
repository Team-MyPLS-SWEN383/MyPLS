import type { Express } from 'express';
import DatabaseHandler from '../db';
import auth from '../helpers/auth';

export const courseRoutes = (app: Express, DB: DatabaseHandler) => {
  app.route("/courses")
  .get(async (req, res) => {
    return res.send(await DB.getCourses()).end();
  })
  .post(auth, async (req, res) => {
    const { coursename, courseCode, username } = req.body;
    await DB.addCourse(coursename, courseCode, username);
    res.status(200);
    res.redirect(".");
  })
  .delete(auth, async (req, res) => {
    const { coursename } = req.body;
    await DB.deleteCourse(coursename);
    res.redirect(".");
  })
  .patch(auth, async (req, res) => {
    const { newCoursename, oldCoursename } = req.body;
    await DB.updateCourseName(newCoursename, oldCoursename);
    res.status(200);
    res.redirect(".");
  })
}

