export default function (req, res, next) {
   if (req.isAuthenticated()&&req.user.admin) {
       return next();
   }
   res.redirect("/pedido/lst");
};