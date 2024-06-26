const Product = require("../Models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

const addProduct = async (req, res) => {
  try {
    const { title, author, genre, price, ISBN, description, publisher, publicationDate, language } = req.body;
    const image = req.file.filename;
    const newProduct = new Product({
      title,
      author,
      genre,
      price,
      ISBN,
      description,
      publisher,
      publicationDate,
      language,
      image
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error adding product' });
  }
};

module.exports = { getProducts, getProductById, addProduct };
