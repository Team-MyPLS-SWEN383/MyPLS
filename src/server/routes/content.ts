import type { Express } from 'express';
import DatabaseHandler from '../db';
import auth, { profAuth } from '../helpers/auth';

export const contentRoutes = (app: Express, DB: DatabaseHandler) => {
  app.route("/content")
  .get(async (req, res) => {
    console.log("lecture content GET call");
    return res.redirect(".");
    // return res.send(await DB.getLecture()).end();
  })
  .post(profAuth, async (req, res) => {
    const { ContentLink, Lecture_idLecture } = req.body;
    console.log("lecture content POST call");
    // await DB.createLecture(ContentLink, Lecture_idLecture);
    res.status(200);
    res.redirect(".");
  })
  .delete(profAuth, async (req, res) => {
    const { title } = req.body;
    console.log("lecture content DELETE call");
    // await DB.deleteLecture(title);
    res.redirect(".");
  })
  .patch(profAuth, async (req, res) => {
    const { ContentLink, Lecture_idLecture } = req.body;
    console.log("lecture content PATCH call");
    // await DB.updateLecture(ContentLink, Lecture_idLecture);
    res.status(200);
    res.redirect(".");
  })
}