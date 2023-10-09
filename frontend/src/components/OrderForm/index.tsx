"use client";

import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import FileUpload from "./FileUpload";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createOrder } from "../../api";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SuccessMessage from "./SuccessMessage";


export default function OrderForm() {
  const pageSize = 20;
  const [showSuccess, setShowSuccess] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [offsetStart, setOffsetStart] = useState<number>(0);
  const [offsetEnd, setOffsetEnd] = useState<number>(0);
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder]= useState<Order>();
  const [total, setTotal] = useState<Number> ();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState("");
  const formik = useFormik({
    initialValues: {
      vendor: '',
      file: null,
      date: new Date(),
    },
    validationSchema: Yup.object({
      vendor: Yup.string()
      .min(3, "Must be at least 3 characters")
        .max(15, 'Must be 15 characters or less')
        .required('A vendor is Required'),
      date: Yup.date().nullable()
      .typeError('The value must be a date (YYYY-MM-DD)')
        .required('A date Required'),
      file: Yup.mixed().required('A file is Required'),
    }),
    onSubmit: async (values, { setTouched}, ) => {
      setIsSubmitting(true);
      setTouched({});
      const order: OrderSubmission = {
        vendor: values.vendor,
        date: values.date,
        file: values.file
      }
      try {
        const res = await createOrder(order);
        if (res && res.products) {
          setCompletedOrder(res);
          setProducts(res.products);
          setShowSuccess(true);
        }
        setIsSubmitting(false);
      } catch (error: any) {
        console.log("error: ", error)
        setFormErrors("Error creating order: " + error.message);
        formik.resetForm();

        setIsSubmitting(false);
      }
    }
  });
  useEffect(() => {
    const pages = Math.ceil(products.length / pageSize);

    setTotalPages(pages);
  }, [products]);

  useEffect(() => {
    if (file && file.size > 0) {
        console.log("file: ", file.name)
        formik.setFieldValue("file", file);
    }
}, [file]);




useEffect(() => {
  if(completedOrder && completedOrder.products){
      const sum = completedOrder.products.reduce((acc: number, product: Product) => {
          return acc + product.unitPrice * product.quantity;
        }, 0)
        setTotal(sum);
        navigate(`/orders/order/${completedOrder.id}?summary=true&&success=true`);
  }
   }, [completedOrder, showSuccess]);







  useEffect(() => {
    if(formErrors){
      alert(formErrors);}
  }, [formErrors]);

  useEffect(() => {
    const startIdx = (pageIndex - 1) * pageSize;
    const endIdx = pageSize && products.length > 1 ? startIdx + pageSize: startIdx;
    setOffsetStart(startIdx)
    setOffsetEnd(endIdx)

    const currentItems = products.slice(startIdx, endIdx);
    setDisplayedProducts(currentItems);

  }, [pageIndex, pageSize, products]);


  function handleNext() {
    if (pageIndex < totalPages) {
      setPageIndex((prevPageIndex) => prevPageIndex + 1);
    }
  }

  function handlePrevious() {
    if (pageIndex > 1) {
      setPageIndex((prevPageIndex) => prevPageIndex - 1);
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 text-black">
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Order information
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="vendor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vendor
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="vendor"
                    name="vendor"
                    onChange={formik.handleChange}
                    value={formik.values.vendor}
                    onBlur={formik.handleBlur}
                    className={`block w-full rounded-md shadow-sm sm:text-sm ${
                      formik.touched.vendor && formik.errors.vendor ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
                    }`}
                  />
              {formik.touched.vendor && formik.errors.vendor ? (
                      <div>{formik.errors.vendor}</div>
                    ) : null}
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <div className="mt-1 flex">
                  <DatePicker
                    selected={formik.values.date}
                    onChange={(date: Date) => {
                      formik.setFieldValue('date', date);
                      formik.setFieldTouched('date', true);
                    }}
                    onBlur={formik.handleBlur}
                    name="date"
                    className={`block w-full rounded-md text-black shadow-sm sm:text-sm ${
                      formik.touched.date && formik.errors.date ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'
                    }`}
                  />
                  {formik.touched.date && formik.errors.date ? (
                    <div className="text-red-500 mt-2">{`${formik.errors.date}`}</div>
                  ) : null}
                </div>

              </div>
            </div>
            {formik.touched.file && formik.errors.file ? (
                      <div>{`${formik.errors.file}`}</div>
                    ) : null}
            <FileUpload
              setFile={(uploadedFile) => {
                setFile(uploadedFile);
                formik.setFieldValue('file', uploadedFile);
              }}
              file={file}
            />

          </div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            {
              showSuccess && <SuccessMessage />
            }
            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {displayedProducts.map((product: any) => (
                  <li
                    key={product.model_number}
                    className="flex px-4 py-6 sm:px-6"
                  >
                    <div className="flex-shrink-0"></div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm"></h4>
                        </div>

                        <div className="ml-4 flow-root flex-shrink-0">
                          <button
                            type="button"
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          Model: {product.model_number}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          Quantity: {product.quantity}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          Unit Price: ${product.unitPrice}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          Product Total: ${product.unitPrice * product.quantity}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6  border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${total?.toLocaleString()}
                  </dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Previous
                    </a>
                    <a
                      href="#"
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Next
                    </a>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>

                    </div>
                    <div>
                      <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                      >
                        <a
                          href="#"
                          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                            onClick={handlePrevious}
                          />
                        </a>

                        <a
                          href="#"
                          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                            onClick={handleNext}
                          />
                        </a>
                      </nav>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{offsetStart}</span> to{" "}
                        <span className="font-medium">{offsetEnd}</span> of{" "}
                        <span className="font-medium">{products.length}</span> results
                      </p>
                    </div>
                  </div>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  type="button"
                  disabled={!formik.isValid || !formik.dirty}
                  onClick={() => formik.handleSubmit()}
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm disabled:opacity-25 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Confirm order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
