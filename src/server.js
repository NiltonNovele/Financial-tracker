

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model("Product", {
  name: String,
  category: String,
  barcode: String,
  dateAdded: String,
  stock: Number,
  price: String,
});

const Sale = mongoose.model("Sale", {
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      total: Number,
    },
  ],
  totalAmount: Number,
  payment: {
    cash: Number,
    card: Number,
  },
  date: { type: Date, default: Date.now },
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send("Error fetching products");
  }
});

app.get("/api/products/search", async (req, res) => {
  const searchTerm = req.query.q || "";
  try {
    const products = await Product.find({
      $or: [
        { barcode: { $regex: searchTerm, $options: "i" } },
        { name: { $regex: searchTerm, $options: "i" } },
      ],
    });
    res.json(products);
  } catch (err) {
    res.status(500).send("Error searching products");
  }
});

app.post("/api/products", async (req, res) => {
  const { name, category, barcode, dateAdded, stock, price } = req.body;
  const newProduct = new Product({ name, category, barcode, dateAdded, stock, price });
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).send("Error adding product");
  }
});

app.post("/api/sale", async (req, res) => {
  const { items, cash, card } = req.body;

  let totalAmount = 0;
  const saleItems = [];

  for (let item of items) {
    const product = await Product.findById(item.productId);
    if (product && product.stock >= item.quantity) {
      const total = product.price * item.quantity;
      totalAmount += total;
      saleItems.push({ ...item, total });
      product.stock -= item.quantity;
      await product.save();
    }
  }

  const sale = new Sale({
    items: saleItems,
    totalAmount,
    payment: { cash, card },
  });

  try {
    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(500).send("Error processing sale");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
