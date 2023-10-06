import { useState, useEffect } from 'react'
import { getOrders } from '../api'
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders]= useState<Order[]>();
  useEffect(()=> {
    getOrders().then((res)=> {
      setOrders(res);
      
    })
  }, [])
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and discover similar products.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {orders ? orders?.map((order) => (
                <div
                  key={order.id}
                  className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                  onClick={()=> {
                    navigate(`/orders/order/${order.id}`);

                  }}
                >
                 {order.date ? <h3 className="sr-only">
                    Order placed on <time dateTime={new Date(order.date).toDateString()}>
            {order?.date ? new Date(order.date).toDateString() : ""}
            </time>
                  </h3>: null}


                  <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                    <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                      <div>
                        <dt className="font-medium text-gray-900">Order number</dt>
                        <dd className="mt-1 text-gray-500">{order.id}</dd>
                      </div>
                      <div className="hidden sm:block">
                        <dt className="font-medium text-gray-900">Date placed</dt>
                        <dd className="mt-1 text-gray-500">
                        <time dateTime={new Date(order?.date).toISOString()}>
                        {order?.date ? new Date(order.date).toLocaleDateString() : ""}
                        </time>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Total amount</dt>
                        <dd className="mt-1 font-medium text-gray-900">$10000</dd>
                      </div>
                    </dl>

        

                  </div>

      
                </div>
              )): null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
