const jwt = require("jsonwebtoken");

const Product = require("../models/product");

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) res.status(500).json({ status: "failed" });
    res.status(200).json({ status: "success", product: product });
  });
};
exports.getProducts = (req, res, next) => {
  const productQuery = Product.find();
  let fetchedProducts;
  productQuery
    .then((documents) => {
      fetchedProducts = documents;
      return Product.count();
    })
    .then((count) => {
      res.status(200).json({
        status: "success",
        products: fetchedProducts,
        maxPosts: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "failed",
      });
    });
};

exports.getLatestProducts = (req, res, next) => {
  Product.find((err, products) => {
    if (err) res.status(500).json({ status: "failed" });
    let resp = {
      status: "success",
      products: products,
    };
    res.send(resp);
  })
    .sort({ createdOn: -1 })
    .limit(3);
};
exports.getCategories = (req, res, next) => {
  Product.find((err, products) => {
    if (err) res.status(500).json({ status: "failed" });
    let categories = [];
    for (let i = 0; i < products.length; i++) {
      categories.push(products[i].category);
    }
    let resp = {
      status: "success",
      categories: categories,
    };
    res.send(resp);
  });
};
exports.getCategoryProducts = (req, res, next) => {
  let cat = req.params.category;
  Product.find((err, products) => {
    if (err) res.status(500).json({ status: "failed" });
    let productsCategory = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].category == cat) productsCategory.push(products[i]);
    }
    let resp = {
      status: "success",
      products: productsCategory,
    };
    res.send(resp);
  });
};
exports.deleteProduct = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id, (err, employee) => {
    if (err) res.status(500).json({ status: "failed" });
    res.status(200).json({
      status: "success",
      message: "product deleted successfully",
      product: employee,
    });
  });
};

exports.createProduct = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    discountPrice: req.body.discountPrice,
    description: req.body.description,
    image: req.body.image,
    isTopProduct: req.body.isTopProduct,
  });
  product
    .save()
    .then((createdProduct) => {
      res.status(201).json({
        status: "success",
        products: createdProduct,
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "failed",
      });
    });
};
exports.updateProduct = (req, res, next) => {
  const post = req.body;
  var productId = req.params.id;
  Product.findByIdAndUpdate(productId, post, (err, updatedUser) => {
    if (err) res.status(500).json({ status: "failed" });
    res
      .status(200)
      .json({
        status: "success",
        message: "product edited successfully",
        product: updatedUser,
      });
  });
};
