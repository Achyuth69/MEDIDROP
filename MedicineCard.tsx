
import { Medicine } from "@/data/medicineData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Pill, ShoppingCart } from "lucide-react";

interface MedicineCardProps {
  medicine: Medicine;
}

const MedicineCard = ({ medicine }: MedicineCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Added to cart",
      description: `${medicine.name} has been added to your cart`,
    });
  };

  return (
    <Card 
      className="h-full overflow-hidden transition-all hover:shadow-md cursor-pointer border-2 hover:border-primary/50"
      onClick={() => navigate(`/medicines/${medicine.id}`)}
    >
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{medicine.name}</CardTitle>
          <div className="flex gap-2">
            {medicine.requiresPrescription && (
              <Badge variant="outline" className="text-xs">Requires Rx</Badge>
            )}
            {!medicine.inStock && (
              <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="bg-secondary rounded-lg p-4 mb-4 flex items-center justify-center">
          <Pill className="h-12 w-12 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground mb-2">{medicine.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Category: {medicine.category}</p>
            <p className="text-sm text-muted-foreground">Mfr: {medicine.manufacturer}</p>
          </div>
          <p className="text-lg font-medium">${medicine.price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant={medicine.inStock ? "default" : "secondary"} 
          className="w-full"
          disabled={!medicine.inStock || medicine.requiresPrescription}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {medicine.requiresPrescription 
            ? "Requires Prescription" 
            : medicine.inStock 
              ? "Add to Cart" 
              : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MedicineCard;
