const {User} = require('../models')
const bcrypt = require('bcryptjs')

class Controller {
    static async homePage(req, res){
        try {
            res.render('Home')
        } catch (err) {
            res.send(err)
        }
    }
    // //mambuat login form login page
    // static async loginPage(req, res){
    //     try {
    //         //check jika user berhasil login dan session ada
    //         //jika gagal login maka ke home untuk login
    //         // if (req.session.id !== undefined) {
    //         //     return res.redirect('/');
    //         // }
    //         //handle di permintaan login
    //         // if (req.method === 'POST') {
    //         // const { username, password } = req.body;
    //             const user = await User.findOne({ where: { username } });
    //             res.send(data)
    //         //     if(user){
    //         //     //jika username ada check valid passwordnya
    //         //         const isPasswordValid = await bcrypt.compare(password, user.password);
    //         //         if(isPasswordValid){
    //         //             req.session.id = user.id;
    //         //             return res.redirect('/')
    //         //         }else {
    //         //             const error = `invalid username and password`
    //         //             return res.redirect(`/login?error=${error}`)
    //         //         }
    //         //     //jika username nya tidak ada
    //         //     }else{
    //         //         const error = `invalid username and password`
    //         //         return res.redirect(`/login?error=${error}`)
    //         //     }
                
    //         //     //jika semua nya valid
    //         //     req.session.id = user.id;
    //         //     return res.redirect('/');
    //         // }
    
    //         // Render the login page (GET request)
    //         res.render('login', { info });
    //     } catch (err) {
    //         res.send(err)
    //     }
    // }
}

module.exports = Controller