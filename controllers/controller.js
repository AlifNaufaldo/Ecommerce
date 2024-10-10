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
    //menampilkan form register
    static async showRegistForm(req, res) {
        try {
            res.render('register')
        } catch (error) {
            console.log(error);
        }
    }
    static async loginPage(req, res) {
        try {
            const { username, password } = req.body;
                const user = await User.findOne({ where: { username } });
                res.send(user)
                if(user){
                //jika username ada check valid passwordnya
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if(isPasswordValid){
                        req.session.id = user.id;
                        return res.render('Home',{user})
                    }else {
                        const error = `invalid username and password`
                        return res.redirect(`/login?error=${error}`)
                    }
                //jika username nya tidak ada
                }else{
                    const error = `invalid username and password`
                    return res.redirect(`/login?error=${error}`)
                }
        } catch (err) {
            res.send(err)
        }
    }
    static async registerPage(req, res) {
        const {name, email, password, role} = req.body
        try {
            await User.create({name, email, password, role})
            res.redirect('/login')
        } catch (err) {
            if(err.name == `SequelizeValidationError`){
                const error = err.errors.map((e) => e.message).join(', ')
                return res.status(400).redirect(`/register?error=${error}`)
            }
            res.send(err)
        }
    }
    static async logout(req, res){
        req.session = null;
        res.redirect('/')
    }
    
}

module.exports = Controller