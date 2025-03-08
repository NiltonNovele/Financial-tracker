import React, { useState } from "react";
import axios from "axios";

const Sales = () => {
  const [cart, setCart] = useState([]);
  const [barcodeInput, setBarcodeInput] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cash, setCash] = useState("");
  const [card, setCard] = useState("");

  const handleAddProduct = async () => {
    if (!barcodeInput) return;

    try {
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

        setCart((prevCart) => [...prevCart, productWithQuantity]);
        setTotalAmount((prevTotal) => (prevTotal + parseFloat(productWithQuantity.total)).toFixed(2));
        setBarcodeInput("");
      }
    } catch (err) {
      alert("Error fetching product");
    }
  };

  const handleFinalizeSale = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const saleData = {
      items: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      cash: parseFloat(cash) || 0,
      card: parseFloat(card) || 0,
    };

    try {
      await axios.post("http://localhost:5000/api/sale", saleData);
      alert("Sale completed successfully!");
      setCart([]);
      setTotalAmount(0);
      setCash("");
      setCard("");
    } catch (err) {
      alert("Error processing sale");
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

  return (
    <div className="sales-page">
      <h1>Sales - Cashier</h1>
      <div className="input-section">
        <div className="barcode-input">
          <input type="text" placeholder="Enter Barcode" value={barcodeInput} readOnly />
          <div className="button-grid">
            {[...Array(9).keys()].map((number) => (
              <button key={number} onClick={() => handleNumberClick((number + 1).toString())}>
                {number + 1}
              </button>
            ))}
            <button onClick={handleClearInput}>Clear</button>
            <button onClick={() => handleNumberClick("0")}>0</button>
            <button onClick={handleAddProduct}>Add Product</button>
          </div>
        </div>

        <div className="quantity-section">
          <label>Quantity</label>
          <input type="number" value={quantity} min="1" max="10" onChange={handleQuantityChange} />
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
          <h4>Total: ${totalAmount}</h4>
        </div>
      </div>

      <div className="payment">
        <h3>Payment</h3>
        <div className="payment-options">
          <input type="number" placeholder="Cash" className="payment-input" value={cash} onChange={(e) => setCash(e.target.value)} />
          <input type="number" placeholder="Card" className="payment-input" value={card} onChange={(e) => setCard(e.target.value)} />
        </div>
        <button className="print-btn" onClick={handleFinalizeSale}>Finalize Sale</button>
      </div>
    </div>
  );
};

export default Sales;
