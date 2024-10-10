const Controller = require('../controllers/controller.js');
const router = require('express').Router();

router.get('/', Controller.homePage)
router.get('/login', Controller.loginPage)
router.get('/register',Controller.showRegistForm)
router.post('/register',Controller.registerPage)
router.get('/logout',Controller.logout)

// router.use(function (req, res, next) {
//     if (!req.session.user.id) {
//         const error = `Please login first`
//         return res.redirect(`/login?srror=${error}`);
//     }else {
//         next()
//     }
// })
// router.get('/products',)
// router.get('/user/:id/profile/edit',)
// router.post('/user/:id/profile/edit', )
// router.get('/products/add',)
// router.post('/products/add',)
// router.get('/products/:id/buy',)
// router.get('/products/:id/update', )
// router.post('/products/:id/update', )
// router.get('/products/:id/delete', )

module.exports = router