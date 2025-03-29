
import api from './api';

const DoctorService = {
  // Appointment management
  getAppointments: async () => {
    try {
      const response = await api.get('/doctors/appointments');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch appointments' };
    }
  },
  
  updateAppointmentStatus: async (appointmentId, status) => {
    try {
      const response = await api.patch(`/doctors/appointments/${appointmentId}`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update appointment status' };
    }
  },
  
  // Patient management
  getPatients: async () => {
    try {
      const response = await api.get('/doctors/patients');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch patients' };
    }
  },
  
  getPatientDetails: async (patientId) => {
    try {
      const response = await api.get(`/doctors/patients/${patientId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch patient details' };
    }
  },
  
  // Prescription management
  createPrescription: async (patientId, medications, instructions, duration) => {
    try {
      const response = await api.post('/doctors/prescriptions', {
        patientId,
        medications,
        instructions,
        duration
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create prescription' };
    }
  },
  
  getPrescriptions: async () => {
    try {
      const response = await api.get('/doctors/prescriptions');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch prescriptions' };
    }
  },
  
  updatePrescription: async (prescriptionId, updates) => {
    try {
      const response = await api.patch(`/doctors/prescriptions/${prescriptionId}`, updates);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update prescription' };
    }
  }
};

export default DoctorService;
