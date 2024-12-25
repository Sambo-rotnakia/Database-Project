const Product = require("../models/productModel");
const upload = require('../config/config/multer');

exports.getAllProducts = async (req,res) => {
    try{
        const products = await Product.getAll();
        title = "List product"
        res.render('selling/index',{products,title});
    }catch(err){
        res.status(500).send("Error fetching products");
    }
};

exports.renderCreateForm = (req,res)=>{
    title = "New Product"
    res.render('selling/create', {title});
};

exports.createProduct = async(req,res)=>{
    try{
        const { name, description, price } = req.body;
        let image_path = "";
        if(req.file){
            image_path = `/uploads/${req.file.filename}`;
        }
        await Product.create({ name, description, price, image: image_path});
        res.redirect("/selling");
    }catch(err){
        let backurl = '/selling';
        req.flash('error', err.sqlMessage);
        return res.redirect(backurl);
    }
}

exports.renderEditForm = async (req, res) => {
    try {
      const product = await Product.getById(req.params.id);
      title = "Edit Product";
      if (product) {
        res.render('selling/edit', { product,title });
      } else {
        res.status(404).send('Product not found');
      }
    } catch (err) {
      res.status(500).send('Error fetching product');
    }
};

exports.updateProduct = async (req,res) => {
    try{
        const {name, description, price } = req.body;
        let image_path = "";

        if (req,file){
            image_path = `/upload/${req.file.filename}`;
        }
        else {
            const product = await Product.getById(req.params.id);
            image_path = product.image;
        }
        await Product.update(req.params.id, { name, description, price, image: image_path });
        
        res.redirect('/selling');
    } catch(err){
        res.status(500).send('Error updating product');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
      await Product.delete(req.params.id);
      res.redirect('/selling');
    } catch (err) {
      res.status(500).send('Error deleting product');
    }
  };