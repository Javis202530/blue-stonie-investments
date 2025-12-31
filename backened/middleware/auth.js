module.exports = function (req, res, next) {
  // TEMP BASIC AUTH (you can improve later)
  const isAdmin = true; // change later when adding JWT

  if (!isAdmin) {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};
