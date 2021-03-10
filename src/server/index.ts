import sirv from "sirv";
import express from "express";
import bodyParser from "body-parser";
import DatabaseHandler from "./db";
import roleNameToId from "./helpers/roleNameToId";

const DB = new DatabaseHandler();

const app = express();

// loads the static assets (index.html, login.html, etc) for us
const assets = sirv('public');
app.use(assets);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is how you'd go about creating new API endpoints and
// sending data back to the client
// more documentation here: http://expressjs.com/en/guide/routing.html#route-handlers
app.get("/users/", async (req, res) => {
  return res.send(await DB.getUsers()).end();
})

// we can use things like .get, .post, and .delete to make things RESTful and semantic
app.post("/users/", async (req, res) => {
  const {username, psw, role} = req.body;
  await DB.addUser(username, psw, roleNameToId(role));
  res.redirect("/login");
})

// so we can do different things when using different methods to ping the same route
app.delete("/users/", async (req, res) => {
  console.log(req.body);
  const {username} = req.body;
  await DB.deleteUser(username);
  res.redirect("/index");
})

app.listen(5000, () => {
  console.log("ready on https://localhost:5000");
})
