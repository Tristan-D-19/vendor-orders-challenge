import axios from 'axios';
const BASE_URL = import.meta.env.DEV ? "/api": import.meta.env.VITE_API_ENDPOINT 



const convertToFormData = (order: OrderSubmission): FormData => {
  const formData = new FormData();
  formData.append('vendor', order.vendor);
  formData.append('date', order.date.toISOString());
  formData.append('file', order.file); 
  
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
          console.error("Error uploading the file:", error);
          throw error;
        }
  }
