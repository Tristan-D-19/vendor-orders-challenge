import {  useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getOrder } from '../api';

export default function Order() {
    const { orderId } = useParams();
    const [order, setOrder]= useState<Order>();
    const [total, setTotal] = useState<Number> ();
    useEffect(() => {
     if(orderId){
        getOrder(orderId).then(res =>{
            setOrder(res);
        })
     }
      }, [orderId]);
    

      useEffect(() => {
        if(order && order.products){
            const sum = order.products.reduce((acc: number, product: Product) => {
                return acc + product.unitPrice * product.quantity;
              }, 0)
              setTotal(sum);
        }
         }, [order]);
  return (
    <>
   <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Order Details</h1>

        <div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
          <dl className="flex">
            <dt className="text-gray-500">Order number&nbsp;</dt>
            <dd className="font-medium text-gray-900">{order?.id}</dd>
            <dt>
              <span className="ml-5">Date</span>
              <span className="mx-2 text-gray-400" aria-hidden="true">
                &middot;
              </span>
            </dt>
            <dd className="font-medium text-gray-900">
            {order ? <time dateTime={new Date(order.date).toISOString()}>
            {order?.date ? new Date(order.date).toLocaleDateString() : ""}
            </time>: null}
            </dd>
          </dl>

        </div>

        <div className="mt-8">
          <h2 className="sr-only">Products purchased</h2>

          <div className="space-y-24">
          <ul role="list" className="divide-y divide-gray-100">
            {order?.products?.map((product) => (
       <li key={product.id} className="flex justify-between gap-x-6 py-5">
       <div className="flex min-w-0 gap-x-4">
         <div className="min-w-0 flex-auto">
         <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                  <h3 className="text-lg font-medium text-gray-900">
                 Model Number: {product.modelNumber}
                  </h3>
                  
                 
                  </div>
 
         </div>
         
       </div>
       <div className="flex shrink-0 items-center gap-x-6">
         <div className="hidden sm:flex sm:flex-col sm:items-end">
         <p className="mt-3 text-gray-500">Quantity: {product.quantity}</p>
         
         </div>
     
       </div>
       <div className="flex shrink-0 items-center gap-x-6">
         <div className="hidden sm:flex sm:flex-col sm:items-end">
         <p className="mt-1 font-medium text-gray-900">unit price: ${product.unitPrice}</p>
         
         </div>
     
       </div>
     </li>
            ))}

    </ul>

          </div>
        </div>

        <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-7 lg:mt-0 lg:pr-8">
         
              <div className="flex items-center justify-between pt-4">
                <dt className="font-medium text-gray-900">Order total</dt>
              {total ? <dd className="font-medium text-indigo-600"> ${total.toLocaleString()}</dd>: null}
              </div>
            </dl>
      </div>
    </div>
  </>
  )
}

