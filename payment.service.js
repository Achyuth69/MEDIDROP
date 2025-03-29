
import api from './api';

const PaymentService = {
  createPaymentIntent: async (amount, currency = 'usd', description) => {
    try {
      const response = await api.post('/payments/create-intent', {
        amount,
        currency,
        description
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Payment intent creation failed' };
    }
  },
  
  getPaymentMethods: async () => {
    try {
      const response = await api.get('/payments/methods');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to retrieve payment methods' };
    }
  },
  
  getPaymentHistory: async () => {
    try {
      const response = await api.get('/payments/history');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to retrieve payment history' };
    }
  },
  
  processPayment: async (paymentIntentId, paymentMethodId) => {
    try {
      const response = await api.post('/payments/process', {
        paymentIntentId,
        paymentMethodId
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Payment processing failed' };
    }
  }
};

export default PaymentService;
