import sirv from "sirv";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import DatabaseHandler from "./db";
import roleNameToId from "./helpers/roleNameToId";
import auth from "./helpers/auth";
import { roleRoutes } from "./routes/roles";
import { courseRoutes } from "./routes/courses";

const DB = new DatabaseHandler();

const app = express();

app.use(session({
  secret: "lightbulb", 
  cookie: { maxAge: 3600000 },
  saveUninitialized: true,
  resave: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is how you'd go about creating new API endpoints and
// sending data back to the client
// more documentation here: http://expressjs.com/en/guide/routing.html#route-handlers
app.route("/users")
  .get(auth, async (req, res) => {
    return res.send(await DB.getUsers()).end();
  })
  .post(async (req, res) => {
    const {username, password, role, FirstName, LastName, Email} = req.body;
    console.log(req.body);
    await DB.addUser(username, password, roleNameToId(role), FirstName, LastName, Email);
    if (req.session["role"] == "admin") {
      res.redirect(".");
    } else {
      res.redirect("/login");
    }
  })
  .delete(auth, async (req, res) => {
    console.log(req.body);
    const {username} = req.body;
    await DB.deleteUser(username);
    res.redirect("/index");
  })
  .patch(auth, async (req, res) => {
    const { oldUsername, username, FirstName, LastName, Roles_idRoles, Email } = req.body;
    console.log("this is where updateUser method(s) would go");
    console.log("this may help implement it: https://stackoverflow.com/questions/25683760/how-to-dynamically-generate-mysql-update-statement-based-on-defined-variables-fr");
    res.status(200);
    res.redirect(".");
  })

app.get("/admin", auth)

app.post("/login", async (req, res) => {
  const { psw, uname } = req.body;
  const users = await DB.getUsers();
  for (const user of users as any) {
    if (user.password == psw && user.username == uname) {
      switch(user.Roles_idRoles) {
        case 1:
          req.session["role"] = "admin";
          res.redirect("/admin");
          break;
        default:
          res.redirect("/index");
      }
    }
  }
})

app.route("/groups")
  .post(auth, async (req, res) => {
    const { Name, Description } = req.body;
    await DB.createDiscussionGroup(Name, Description);
    res.status(200);
    res.redirect(".");
  })
  .delete(auth, async (req, res) => {
    const { Name } = req.body;
    console.log("this is where the removeDiscussionGroup method would go");
    res.redirect(".");
  })
  .get(auth, async (req, res) => {
    return res.send(await DB.getGroups()).end();
  })
  .patch(auth, async (req, res) => {
    const { newGroupName, oldGroupName } = req.body;
    console.log("this is where the updateGroupName method would go");
    // await DB.updateGroupName(newGroupName, oldGroupName);
    res.status(200);
    res.redirect(".");
  })

courseRoutes(app, DB);
roleRoutes(app, DB);

// app.route("/discussions")
//   .get(auth, async (req, res) => {
//     return res.send(await DB.getDiscussions()).end();
//   })
//   .post(auth, async (req, res) => {
//     const { title } = req.body;
//     await DB.addDiscussion(title);
//     res.redirect("/admin");
//   })

app.post("/linkUserToSomething", auth, (req, res) => {
  // TODO: implement this lmao
  res.redirect("/admin");
})
// loads the static assets (index.html, login.html, etc) for us
const assets = sirv('public', {extensions:['html', 'htm', ".map"]});
app.use(assets);

app.listen(5000, () => {
  console.log("ready on https://localhost:5000");
})
