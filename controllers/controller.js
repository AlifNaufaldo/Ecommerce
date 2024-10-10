const {User} = require('../models')
const bcrypt = require('bcryptjs')

class Controller {

    // buat home page // login // register
    static async homePage(req, res){
        try {
            res.render('Home')
        } catch (err) {
            res.send(err)
        }
    }
}

module.exports = Controller