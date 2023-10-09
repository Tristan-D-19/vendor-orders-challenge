import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Orders from './pages/orders';
import Checkout from './pages/checkout';
import {  useSession, useUser } from '@descope/react-sdk'
import { Descope } from '@descope/react-sdk'

import Layout from './Layout'
import Order from './pages/order';


function App() {
  const { isAuthenticated, isSessionLoading } = useSession()
  const {  isUserLoading } = useUser()




  return <>
  {!isAuthenticated &&
    (
      <Descope
        flowId="sign-up-or-in"
        onSuccess={(e) => console.log("user info: ", e.detail.user)}
        onError={(e) => console.log('Could not log in!')}
      />
    )
  }

  {
    (isSessionLoading || isUserLoading) && <p>Loading...</p>
  }

  {!isUserLoading && isAuthenticated &&
    (
      <>
        <Router>
      <Layout>
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/" element={<Checkout />} />
          <Route path="/orders/order/:orderId" element={<Order/>} />
          <Route path="/orders/:orderId?summary=true" element={<Orders/>} />
        </Routes>
      </Layout>
    </Router>
      </>
    )
  }
</>;
}







export default App
