const jwt = require("jsonwebtoken");

const Product = require("../models/product");

exports.getProduct = (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) res.status(401).json({ status: "failed" });
    res.status(200).json({ status: "success", product: product });
    //res.render("Employee-Detail", { employee: employee });
  });
};
exports.getProducts = (req, res, next) => {
  //   Product.find((err, products) => {
  //     if (err) throw err;
  //     // res.render("employees", { employees: employees });
  //     let resp = {
  //       status: "success",
  //       products: products,
  //     };
  //     res.send(resp);
  //   });
  // const pageSize = +req.query.pagesize;
  //   const currentPage = +req.query.page;
  const productQuery = Product.find();
  let fetchedProducts;
  //   if (pageSize && currentPage) {
  //     postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  //   }
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
  // db.yourcollectionname.find({$query: {}, $orderby: {$natural : -1}}).limit(yournumber)
  Product.find((err, products) => {
    if (err) throw err;
    // res.render("employees", { employees: employees });
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
  // db.yourcollectionname.find({$query: {}, $orderby: {$natural : -1}}).limit(yournumber)
  Product.find((err, products) => {
    if (err) throw err;
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
  // db.yourcollectionname.find({$query: {}, $orderby: {$natural : -1}}).limit(yournumber)
  Product.find((err, products) => {
    if (err) throw err;
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
    if (err) throw err;
    res.send(employee);
  });
};

exports.createProduct = (req, res, next) => {
  //const url = req.protocol + "://" + req.get("host");

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
        // post: {
        //   ...createdProduct,
        //   id: createdProduct._id,
        // },
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
  // Product.updateOne({ _id: req.params.id }, post)
  //   .then((result) => {
  //     if (result.n > 0) {
  //       res
  //         .status(200)
  //         .json({ message: "Update successful!", product: result });
  //     }
  //     res.status(401).json({ message: "Cannot Update other's post" });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({
  //       message: "Couldn't update post!",
  //     });
  //   });

  var productId = req.params.id;
  Product.findByIdAndUpdate(productId, post, (err, updatedUser) => {
    if (err) throw err;
    res
      .status(200)
      .json({ message: "Update successful!", product: updatedUser });
  });
};
