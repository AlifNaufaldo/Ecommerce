const ProductController = require('../controllers/productController.js');
const UserController = require('../controllers/userController.js');
const router = require('express').Router();

router.get('/', UserController.homePage)
router.get('/login', UserController.login)
router.post('/login', UserController.loginPage)
router.get('/register', UserController.showRegistForm)
router.post('/register', UserController.registerPage)
router.get('/logout', UserController.logout)

router.use(function (req, res, next) {
    if (!req.session.userId) {
        const error = `Please login first`
        return res.redirect(`/login?srror=${error}`);
    }else {
        next()
    }
})

router.get('/products',ProductController.showProduct)
router.get('/products/add',ProductController.getAddProductForm)
router.post('/products/add',ProductController.postAddProductForm)
router.get('/products/:id/buy',ProductController.buyProduct)
router.get('/products/:id/update', ProductController.getUpdateProduct)
router.post('/products/:id/update', ProductController.postAddProductForm )
// router.get('/products/:id/delete', )

module.exports = router