const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartControllers");
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const isAdmin = require('../app/http/middlewares/isAdmin')
const orderController = require('../app/http/controllers/customers/orderController')
const adminorderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')

function initRoutes(app) {

  app.get("/", homeController().index);

  app.get("/login", guest, authController().login);
  app.post("/login", authController().postLogin);
  app.get("/register", guest, authController().register);
  app.post("/register", authController().postRegister);
  app.get("/logout", auth, authController().logout);

  app.get("/cart", cartController().index);
  app.post('/update-cart', cartController().update)

  // Customer route
  app.post('/orders', auth, orderController().store);
  app.get('/customer/orders', auth, orderController().index)
  app.get('/customer/orders/:id', auth, orderController().show)

  // admin route
  app.get('/admin/orders', isAdmin, adminorderController().index)
  app.post('/admin/order/status', isAdmin, statusController().update)
}

module.exports = initRoutes;
