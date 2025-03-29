
import api from './api';

const PharmacyService = {
  // Inventory management
  getMedicines: async () => {
    try {
      const response = await api.get('/pharmacy/medicines');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch medicines' };
    }
  },
  
  updateMedicineStock: async (medicineId, quantity) => {
    try {
      const response = await api.patch(`/pharmacy/medicines/${medicineId}`, { stock: quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update medicine stock' };
    }
  },
  
  addMedicine: async (medicineData) => {
    try {
      const response = await api.post('/pharmacy/medicines', medicineData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add medicine' };
    }
  },
  
  // Order management
  getOrders: async () => {
    try {
      const response = await api.get('/pharmacy/orders');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch orders' };
    }
  },
  
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.patch(`/pharmacy/orders/${orderId}`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update order status' };
    }
  },
  
  // Prescription management
  getPrescriptions: async () => {
    try {
      const response = await api.get('/pharmacy/prescriptions');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch prescriptions' };
    }
  },
  
  fulfillPrescription: async (prescriptionId, details) => {
    try {
      const response = await api.post(`/pharmacy/prescriptions/${prescriptionId}/fulfill`, details);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fulfill prescription' };
    }
  }
};

export default PharmacyService;
