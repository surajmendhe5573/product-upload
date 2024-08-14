const express= require('express');
const Product= require('../models/Product')
const multer= require('multer');
const router= express.Router();
const fs= require('fs');
const path= require('path');

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage });
  
  // POST route to add a new product
  router.post('/products', upload.array('images', 4), async (req, res) => {
    try {
      const {
        productName,
        productCategory,
        productCode,
        smallDescription,
        detailedDescription,
        productSize,
        productWoodType,
        finishType,
        productPrice
      } = req.body;
  
      const images = req.files.map(file => file.path);
  
      const product = new Product({
        productName,
        productCategory,
        productCode,
        smallDescription,
        detailedDescription,
        productSize,
        productWoodType,
        finishType,
        productPrice,
        images,
      });
  
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  // GET route to retrieve all products
  router.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  // POST route to add a variant to an existing product
  router.post('/products/:mainProductName/variant', upload.array('images', 4), async (req, res) => {
    try {
      const { mainProductName } = req.params;
      const {
        variantName,
        productSize,
        productWoodType,
        finishType,
        productPrice
      } = req.body;
  
      const images = req.files.map(file => file.path);
  
      const product = await Product.findOne({ productName: mainProductName });
  
      if (!product) {
        return res.status(404).json({ message: 'Main product not found' });
      }
  
      const variant = {
        variantName,
        productSize,
        productWoodType,
        finishType,
        productPrice,
        images,
      };
  
      product.variants.push(variant);
      await product.save();
  
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

// Show Variant
router.get('/:productName/variants', async (req, res) => {
  const { productName } = req.params;

  try {
      const mainProduct = await Product.findOne({ productName });
      if (!mainProduct) {
          return res.status(404).json({ message: 'Main product not found' });
      }

      // Fetch variants associated with this main product
      const variants = await Product.find({ mainProduct: mainProduct._id });

      res.json({
          mainProduct: mainProduct,
          variants: variants
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
});


module.exports= router;