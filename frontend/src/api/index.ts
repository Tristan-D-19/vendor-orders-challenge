import axios from 'axios';
const BASE_URL =  import.meta.env.VITE_API_ENDPOINT



const convertToFormData = (order: OrderSubmission): FormData => {
  const formData = new FormData();
  formData.append('vendor', order.vendor);
  formData.append('date', order.date.toISOString());
  if(order.file)
  {formData.append('file', order.file); }

  return formData;
}
export const createOrder = async (order: OrderSubmission): Promise<Order> =>  {
  const formData = convertToFormData(order);
      try {
          const response = await axios.post(
            `${BASE_URL }/orders`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
            console.log("response: ", response)
          return response.data;
        } catch (error) {
          console.error("Error creating the order:", error);
          throw error;
        }
  }


export const getOrder = async (orderId: string): Promise<Order> => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching the order:", error);
    throw error;
  }
}

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching the orders:", error);
    throw error;
  }
}
