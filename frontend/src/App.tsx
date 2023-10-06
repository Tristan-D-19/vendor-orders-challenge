import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Orders from './pages/orders';
import Checkout from './pages/checkout';

import Layout from './Layout'
import OrderSummary from './pages/orderSummary';
import Order from './pages/order';
function App() {


  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/" element={<Checkout />} />
          <Route path="/orders/order/:orderId?summary=true" element={<OrderSummary/>} />
          <Route path="/orders/order/:orderId" element={<Order/>} />
          <Route path="/orders/:orderId?summary=true" element={<Orders/>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
