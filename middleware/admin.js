function verifyAdmin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Access Denied.");
  next();
}

module.exports = verifyAdmin;
