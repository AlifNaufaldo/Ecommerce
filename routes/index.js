const ProductController = require('../controllers/productController.js');
const UserController = require('../controllers/userController.js');
const router = require('express').Router();

router.get('/', UserController.homePage)
router.get('/login', UserController.login)
router.post('/login', UserController.loginPage)
router.get('/register', UserController.showRegistForm)
router.post('/register', UserController.registerPage)
router.get('/logout', UserController.logout)

// router.use(function (req, res, next) {
//     if (!req.session.user.id) {
//         const error = `Please login first`
//         return res.redirect(`/login?srror=${error}`);
//     }else {
//         next()
//     }
// })
router.get('/products',ProductController.showProduct)
// router.get('/products/add',)
// router.post('/products/add',)
// router.get('/products/:id/buy',)
// router.get('/products/:id/update', )
// router.post('/products/:id/update', )
// router.get('/products/:id/delete', )

module.exports = router