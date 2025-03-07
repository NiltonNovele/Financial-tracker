import React, { useState } from "react";
import axios from "axios";
const inventory = [
  { id: 1, name: "Product 1", price: 10.5, barcode: "12345" },
  { id: 2, name: "Product 2", price: 15.0, barcode: "12346" },
  { id: 3, name: "Product 3", price: 7.5, barcode: "12347" },
  { id: 4, name: "Product 4", price: 12.0, barcode: "12348" },
];

const Sales = () => {
  const [cart, setCart] = useState([]);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAddProduct = (barcode) => {
    const product = inventory.find((product) => product.barcode === barcode);
    if (product) {
      const productWithQuantity = {
        ...product,
        quantity,
        total: (product.price * quantity).toFixed(2),
      };
      setCart([...cart, productWithQuantity]);
      setBarcodeInput(""); 
    }
  };

  const handleNumberClick = (number) => {
    setBarcodeInput((prevInput) => prevInput + number);
  };

  const handleClearInput = () => {
    setBarcodeInput("");
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + parseFloat(item.total), 0)
      .toFixed(2);
  };
  
  const Sales = () => {
    const [cart, setCart] = useState([]);
    const [barcodeInput, setBarcodeInput] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);
  
    const handleAddProduct = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/products/search?q=${barcodeInput}`
      );
      const product = response.data[0];
      if (product) {
        const productWithQuantity = {
          ...product,
          quantity,
          total: (product.price * quantity).toFixed(2),
        };
        setCart([...cart, productWithQuantity]);
        setTotalAmount(
          cart.reduce((total, item) => total + parseFloat(item.total), 0).toFixed(2)
        );
        setBarcodeInput(""); 
      }
    };
  
    const handleFinalizeSale = async () => {
      const saleData = {
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        cash: 100, 
        card: 50, 
      };
  
      try {
        const response = await axios.post(
          "http://localhost:5000/api/sale",
          saleData
        );
        alert("Sale completed successfully!");
        setCart([]);
        setTotalAmount(0);
      } catch (err) {
        alert("Error processing sale");
      }
    };
  
  return (
    <div className="sales-page">
      <h1>Sales - Cashier</h1>
      <div className="input-section">
        <div className="barcode-input">
          <input
            type="text"
            placeholder="Enter Barcode"
            value={barcodeInput}
            readOnly
          />
          <div className="button-grid">
            {[...Array(9).keys()].map((number) => (
              <button
                key={number}
                onClick={() => handleNumberClick((number + 1).toString())}
              >
                {number + 1}
              </button>
            ))}
            <button onClick={handleClearInput}>Clear</button>
            <button onClick={() => handleNumberClick("0")}>0</button>
            <button onClick={() => handleAddProduct(barcodeInput)}>
              Add Product
            </button>
          </div>
        </div>

        <div className="quantity-section">
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            min="1"
            max="10"
            onChange={handleQuantityChange}
          />
        </div>
      </div>

      <div className="receipt">
        <h3>Receipt</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">
          <h4>Total: ${calculateTotal()}</h4>
        </div>
      </div>

      <div className="payment">
        <h3>Payment</h3>
        <div className="payment-options">
          <input type="number" placeholder="Cash" className="payment-input" />
          <input type="number" placeholder="Card" className="payment-input" />
        </div>
        <button className="print-btn">Finalize Sale</button>
      </div>
    </div>
  );
};

  <div className="sales-page">
    <button onClick={handleAddProduct}>Add Product</button>
    <button onClick={handleFinalizeSale}>Finalize Sale</button>
  </div>

};
export default Sales;
