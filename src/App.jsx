import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
 
  const [cart, setCart] = useState([]); 
  const [orders, setOrders] = useState([]); 
  
  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      return found
        ? prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p)) // map
        : [...prev, { ...item, qty: 1 }];
    });
  };

  const incQty = (id) =>
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));

  const decQty = (id) =>
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0)
    );

  const removeItem = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, x) => sum + x.price * x.qty, 0);
    const tax = Math.round(subtotal * 0.1); 
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [cart]);

  const placeOrder = ({ customerName, note }) => {
    if (cart.length === 0) return;

    const order = {
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: cart,
      total: totals.total,
      createdAt: new Date().toISOString(),
      customerName,
      note,
      status: "Preparing",
    };

    setOrders((prev) => [order, ...prev]);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar cartCount={cart.reduce((s, x) => s + x.qty, 0)} />
      <main className="max-w-6xl px-4 py-6 mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu cart={cart} addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                totals={totals}
                incQty={incQty}
                decQty={decQty}
                removeItem={removeItem}
                clearCart={clearCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              cart.length === 0 ? <Navigate to="/menu" /> : <Checkout totals={totals} placeOrder={placeOrder} />
            }
          />
          <Route path="/orders" element={<Orders orders={orders} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
