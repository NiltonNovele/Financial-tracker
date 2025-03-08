import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Inventory.css"; // Importing styles

const generateRandomProducts = () => {
  const categories = ["Toiletries", "Food (Snack)", "Food (Bakery)", "Tools", "Toys"];
  const randomProducts = [];

  for (let i = 1; i <= 100; i++) {
    randomProducts.push({
      id: 1000 + i,
      name: `Product ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      barcode: Math.floor(100000000000 + Math.random() * 900000000000),
      dateAdded: `2024-02-${String((i % 28) + 1).padStart(2, "0")}`,
      stock: Math.floor(Math.random() * 100) + 1,
      price: `MZN ${((Math.random() * 500) + 5).toFixed(2)}`,
    });
  }
  return randomProducts;
};

const Inventory = () => {
  const [products, setProducts] = useState(generateRandomProducts());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?searchTerm=${searchTerm}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSelect = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = () => {
    setProducts(products.filter((product) => !selectedProducts.includes(product.id)));
    setSelectedProducts([]);
  };

  const handleAddProduct = async () => {
    const newProduct = {
      name: "New Product",
      category: "Miscellaneous",
      barcode: Math.floor(100000000000 + Math.random() * 900000000000),
      dateAdded: new Date().toISOString().split("T")[0],
      stock: 10,
      price: `MZN ${(Math.random() * 500 + 5).toFixed(2)}`,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/products", newProduct);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h1>Inventory</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="add-btn" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Product ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Barcode</th>
            <th>Date Added</th>
            <th>Stock Units</th>
            <th>Price (MZN)</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) =>
              Object.values(product).some((value) =>
                value.toString().toLowerCase().includes(searchTerm)
              )
            )
            .map((product) => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelect(product.id)}
                  />
                </td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.barcode}</td>
                <td>{product.dateAdded}</td>
                <td>{product.stock}</td>
                <td>{product.price}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedProducts.length > 0 && (
        <button className="delete-btn" onClick={handleDelete}>
          Delete Selected
        </button>
      )}
    </div>
  );
};

export default Inventory;
