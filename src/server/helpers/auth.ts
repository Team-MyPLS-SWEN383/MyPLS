// TODO: account for other roles
export default (req, res, next) => {
  if (req.session["role"] == "admin") return next();
  else {
    res.status(403);
    res.redirect("/login");
    return;
  }
}