class Controller {
    static async homePage(req, res){
        try {
            res.render('Home')
        } catch (err) {
            res.send(err)
        }
    }
}

module.exports = Controller