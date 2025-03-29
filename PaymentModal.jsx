
import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import PaymentForm from "./PaymentForm";

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  amount, 
  description, 
  onSuccess,
  onCancel 
}) => {
  useEffect(() => {
    // Handle modal escape key functionality
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  // Custom onCancel that calls the parent onCancel
  const handleCancel = () => {
    onClose();
    if (onCancel) onCancel();
  };
  
  // Custom onSuccess that calls the parent onSuccess
  const handleSuccess = () => {
    onClose();
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            Secure payment processing for your order
          </DialogDescription>
        </DialogHeader>
        <PaymentForm 
          amount={amount} 
          description={description} 
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
