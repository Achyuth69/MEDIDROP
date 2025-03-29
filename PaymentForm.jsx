
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import PaymentService from "@/services/payment.service";

const PaymentForm = ({ amount, description, onSuccess, onCancel }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Create payment intent when component mounts
    const createIntent = async () => {
      try {
        const intent = await PaymentService.createPaymentIntent(amount, 'usd', description);
        setPaymentIntent(intent);
      } catch (error) {
        toast({
          title: "Payment setup failed",
          description: error.message || "Could not initialize payment",
          variant: "destructive",
        });
        if (onCancel) onCancel();
      }
    };
    
    createIntent();
  }, [amount, description, toast, onCancel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // In a real implementation, you would:
      // 1. Collect card details securely (preferably with Stripe Elements or similar)
      // 2. Create payment method using the collected details
      // 3. Process the payment with the paymentIntent and paymentMethod
      
      // Simulate payment processing for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Payment successful",
        description: `Your payment of $${(amount/100).toFixed(2)} has been processed successfully.`,
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Payment failed",
        description: error.message || "Could not process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };
  
  const formatExpiryDate = (value) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Add / after first 2 digits
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Payment Information</CardTitle>
        <CardDescription className="text-center">
          Enter your payment details to complete your purchase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {paymentMethod === 'card' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input
                  id="cardName"
                  type="text"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  required
                  maxLength={19}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    required
                    maxLength={5}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => {
                      // Only allow numbers and limit to 3-4 digits
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setCvv(value);
                    }}
                    required
                    maxLength={4}
                  />
                </div>
              </div>
            </>
          )}
          
          {paymentMethod === 'paypal' && (
            <div className="p-4 border rounded-md text-center">
              <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
              <p className="font-medium">Amount: ${(amount/100).toFixed(2)}</p>
            </div>
          )}
          
          {paymentMethod === 'bank' && (
            <div className="p-4 border rounded-md">
              <p className="mb-2">Please make a transfer to:</p>
              <p><strong>Bank:</strong> MediDrop Bank</p>
              <p><strong>Account:</strong> 1234567890</p>
              <p><strong>Reference:</strong> {paymentIntent?.id || 'Loading...'}</p>
              <p className="mt-2 font-medium">Amount: ${(amount/100).toFixed(2)}</p>
            </div>
          )}
          
          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-2">
              Payment Amount: <span className="font-medium">${(amount/100).toFixed(2)}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
          
          <Button type="submit" className="w-full" disabled={isProcessing || !paymentIntent}>
            {isProcessing ? "Processing..." : `Pay $${(amount/100).toFixed(2)}`}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center w-full text-muted-foreground">
          <button 
            onClick={onCancel}
            className="underline underline-offset-4 hover:text-primary"
            type="button"
          >
            Cancel Payment
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PaymentForm;
