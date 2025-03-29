
import api from './api';

const PatientService = {
  // Consultation booking
  getAvailableDoctors: async () => {
    try {
      const response = await api.get('/patients/available-doctors');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch available doctors' };
    }
  },
  
  bookConsultation: async (doctorId, date, time, reason) => {
    try {
      const response = await api.post('/patients/book-consultation', {
        doctorId,
        date,
        time,
        reason
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to book consultation' };
    }
  },
  
  getConsultations: async () => {
    try {
      const response = await api.get('/patients/consultations');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch consultations' };
    }
  },
  
  // Prescription management
  getPrescriptions: async () => {
    try {
      const response = await api.get('/patients/prescriptions');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch prescriptions' };
    }
  },
  
  requestMedicineRefill: async (prescriptionId) => {
    try {
      const response = await api.post(`/patients/prescriptions/${prescriptionId}/refill`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to request refill' };
    }
  },
  
  // Order management
  orderMedicine: async (items) => {
    try {
      const response = await api.post('/patients/orders', { items });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to place order' };
    }
  },
  
  getOrders: async () => {
    try {
      const response = await api.get('/patients/orders');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch orders' };
    }
  },
  
  getOrderDetails: async (orderId) => {
    try {
      const response = await api.get(`/patients/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch order details' };
    }
  }
};

export default PatientService;
