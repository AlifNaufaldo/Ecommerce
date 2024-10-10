
const {Product, Order, Category, User} = require('../models');
const bcrypt = require('bcryptjs');
const {Op} = require('sequelize')

class ProductController {
    static async showProduct(req, res) {
        const {filter} = req.query //untuk static metode filter
        try {
            // res.send('hfhf')
            // const data = await Product.findAll({
            //     include: Category
            // })
            const data = await Product.getProductByCategory(filter, Category, {
                include :{
                    model: Category,
                    attributes: ['name']
                  }
            })
            res.send(data)
            // res.render()
        } catch (error) {
            console.log(error);
            return res.send({ message: 'Please check your input', error: error.message });  
        }
    }
    static async getAddProductForm(req, res) {
            try {
                const data = await Product.findAll()
                // res.send(data)
                res.render('addProduct', {data}); 
            } catch (error) {
                console.error(error);
                return res.send({ message: 'Please check your input', error: error.message });
            }
        }
    static async postAddProductForm(req, res) {
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
            // res.send(data);
            res.redirect()
        } catch (error) {
            console.error(error);
            return res.send({ message: 'Please check your input', error: error.message });
        }
    }
    static async buyProduct(req, res) {
        try {
            // Mendapatkan ID produk dari parameter URL
            const {productId} = req.params;
            // Mendapatkan data produk berdasarkan ID
            const product = await Product.findByPk(productId);
            // Validasi: jika produk tidak ditemukan
            if (!product) {
                return res.send({ message: 'Product is not found' });
            }
            // Buat entri baru di tabel Order
            const newOrder = await Order.create({
                productId: product.id,
                userId: userId,
                quantity: 1, // Atur jumlah yang dibeli, ini bisa diubah jika ingin
                amount: product.price, // Total harga berdasarkan harga produk
            });
            res.send({ message: 'Order is succesfull', newOrder});
        } catch (error) {
            console.error(error);
            return res.send({ message: 'Please check your input', error: error.message });
        }
    }
    static async getUpdateProduct(req, res) {
        try {
            // Mendapatkan id produk dari parameter URL
            const {productId} = req.params;
            // Mencari produk yang akan diperbarui
            const data = await Product.findByPk(productId);
            if (!data) {
                return res.send({ message: 'product is not found' });
            }
               res.render('', {data});
            // res.redirect()
        } catch (error) {
            console.error(error);
            return res.send({ message: 'Please check your input', error: error.message });
        }
    }
    static async postUpdateProduct(req, res) {
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
               res.send(newProduct);
            // res.redirect()
        } catch (error) {
            console.error(error);
            return res.send({ message: 'Please check your input', error: error.message });
        }
    }
    static async deleteProduct(req, res) {
        try {
            // Mendapatkan ID produk dari parameter URL
            const {productId} = req.params;
            // Mencari produk berdasarkan ID
            const data = await Product.findByPk(productId);
            // Validasi: jika produk tidak ditemukan
            if (!data) {
                return res.send({ message: 'Product is not found' });
            }
            // Menghapus produk
            await Product.destroy({
                where: { id: productId }
            });
            return res.send({ message: 'Product delete is success' });
        } catch (error) {
            console.error(error);
            return res.send({ message: 'Please check your input', error: error.message });
        }
    } 
}
module.exports = ProductController