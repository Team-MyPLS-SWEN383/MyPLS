// TODO: account for other roles
export default (req, res, next) => {
  if (req.session["role"] == "admin") return next();
  else {
    res.status(403);
    res.redirect("/login");
    return;
  }
}

export const profAuth = (req, res, next) => {
  if (req.session["role"] == "admin") return next();
  else if (req.session["role"] == "instructor") return next();
  else {
    res.status(403);
    res.redirect("/login");
    return;
  }
}