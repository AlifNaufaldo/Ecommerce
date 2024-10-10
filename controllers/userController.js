const {User} = require('../models')
const bcrypt = require('bcryptjs')

class UserController {
    // buat home page // login // register
    static async homePage(req, res){
        try {
            res.render('Home')
        } catch (err) {
            res.send(err)
        }
    }

    static async login(req, res){
        try {
            res.render('Login')
        } catch (err) {
            res.send(err)
        }
    }
    
    //login 
    static async loginPage(req, res) {
        try {
            const { username, password } = req.body;
            // console.log(username)
            // console.log(password)
            // console.log(req.body)
            const user = await User.findOne({ where: { username } }); 

            if (!user) {
                return res.status(401).send("Invalid username or password.");
            } 

            const validatePassword =  await bcrypt.compare(password, user.password);
            // console.log(validatePassword)

            if (!validatePassword) {
                return res.status(401).send("Invalid username or password.");
            } 
            req.session.userId = user.id;
            res.redirect('/products');
        } catch (error) {
            res.send(error.message);
        }
    }

    //menampilkan form register
    static async showRegistForm(req, res) {
        try {
            res.render('AddFormUser')
        } catch (error) {
            console.log(error);
        }
    }

    static async registerPage(req, res) {
        try {
            //tampung
			const { username, email, password, role } = req.body;

            //check ke  database

			const userAlreadyExist = await User.findOne({ where: { username } });
			if (userAlreadyExist) {
				return res.status(400).send("Username already exists.");
			} 

			const emailAlreadyExist = await User.findOne({ where: { email } });
			if (emailAlreadyExist) {
				return res.status(400).send("Email already exists.");
			} 

			const newUser = await User.create({ username, email, password, role });
			res.redirect("/login");
		} catch (error) {
			res.send(error.message);
		}
	}
    
    static async logout(req, res){
        req.session = null;
        res.redirect('/')
    }
    
}

module.exports = UserController