function aut(req, res, next) {
    console.log(req.user)
   if (req.isAuthenticated()&&req.user.admin) {
       return next();
   }
   res.redirect("/home");
};

module.exports = aut