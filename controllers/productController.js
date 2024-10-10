
const {Product, Order, Category, User} = require('../models');
const bcrypt = require('bcryptjs');

class ProductController {
    static async showProduct(req, res) {
        try {
            // res.send('hfhf')
            const data = await Product.findAll({
                include: [{
                    model: User
                }]
            })
            res.send(data)
        } catch (error) {
            console.log(error);
            res.send(error)
            
        }
    }
    static async addProduct(req, res) {
        try {
            // Mendapatkan data dari request body
            const { name, description, price, imgUrl, CategoryId} = req.body;

            // Validasi input
            if (!name || !description || !price || !imgUrl || !CategoryId) {
            return res.send({ message: 'Field cannot be empty' });
            }
            // Membuat produk baru
            const data = await Product.create({
                name,
                description,
                price,
                imgUrl,
                CategoryId
            });
            return res.send(data);
        } catch (error) {
            console.error(error);
            return res.send({ message: 'please check your input', error: error.message });
        }
    }
    static async updateProduct(req, res) {
        try {
            // Mendapatkan id produk dari parameter URL
            const {productId} = req.params;

            // Mendapatkan data dari request body
            const { name, description, price, imgUrl, CategoryId} = req.body;

            // Validasi input
            if (!name && !description && !price && !imgUrl && !CategoryId) {
                return res.send({ message: 'Please fiil the field' });
            }
            // Mencari produk yang akan diperbarui
            const data = await Product.findByPk(productId);
            if (!data) {
                return res.send({ message: 'product is not found' });
            }
            // Memperbarui produk dengan data baru
            const newProduct = await Product.update({
                name, description, price, imgUrl, CategoryId
            });
            return res.send(data);
        } catch (error) {
            console.error(error);
            return res.send({ message: 'please check your input', error: error.message });
        }
    }
}
module.exports = ProductController