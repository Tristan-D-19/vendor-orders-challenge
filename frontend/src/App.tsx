import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Orders from './pages/orders';
import Checkout from './pages/checkout';

import Layout from './Layout'
function App() {


  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/" element={<Checkout />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
