const {User} = require('../models')
class Controller {
    static async loginInForm(req, res) {
        try {
            res.render('/login')
        } catch (error) {
            
        }
    }
    static async loginPage(req, res) {
        try {
            // res.send('hgh')
            // handle di permintaan login
            const { username, password } = req.body;
                const user = await User.findOne({ where: { username } });
                // res.send(user)
                if(user){
                //jika username ada check valid passwordnya
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if(isPasswordValid){
                        req.session.id = user.id;
                        return res.redirect('/')
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
    static async postLoginPage(req, res) {
        const {email, password} = req.body;
        try {
            const user = await User.findAll({
                 where: {
                    email: email,
                },
            });
            if (user.length > 0) {
                const user = user[0];
                // Verifikasi password (gunakan bcrypt untuk perbandingan)
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (isPasswordValid) {
                    req.session.id = user.id;
                    res.redirect('/');
                } else {
                    const error = `please try again`
                    res.redirect(`/login?error=${error}`);
                }
            } else {
                const error = `please try again`
                res.redirect(`/login?error=${error}`);
            }
        } catch (err) {
            console.error(err);
        }   
    }
}
module.exports = Controller
