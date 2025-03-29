
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { medicines } from "@/data/medicineData";

const MedicineFilters = ({ onFilterChange, onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showPrescriptionOnly, setShowPrescriptionOnly] = useState(false);
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  // Get unique categories from medicines data
  const categories = Array.from(new Set(medicines.map(med => med.category)));

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const applyFilters = () => {
    let filtered = [...medicines];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(med => 
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(med => med.category === selectedCategory);
    }

    // Apply price range filter
    filtered = filtered.filter(
      med => med.price >= priceRange[0] && med.price <= priceRange[1]
    );

    // Apply prescription filter
    if (showPrescriptionOnly) {
      filtered = filtered.filter(med => med.requiresPrescription);
    }

    // Apply in-stock filter
    if (showInStockOnly) {
      filtered = filtered.filter(med => med.inStock);
    }

    onFilterChange(filtered);
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 100]);
    setShowPrescriptionOnly(false);
    setShowInStockOnly(false);
    onFilterChange(medicines);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search medicines..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button 
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-primary"
              onClick={() => {
                setSearchQuery("");
                onSearchChange("");
              }}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Open filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Narrow down your medicine search with these filters.
              </SheetDescription>
            </SheetHeader>
            
            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={selectedCategory || undefined} 
                  onValueChange={(value) => setSelectedCategory(value || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Availability</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="in-stock" 
                      checked={showInStockOnly}
                      onCheckedChange={(checked) => setShowInStockOnly(checked)}
                    />
                    <Label htmlFor="in-stock" className="cursor-pointer">In Stock Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="prescription" 
                      checked={showPrescriptionOnly}
                      onCheckedChange={(checked) => setShowPrescriptionOnly(checked)}
                    />
                    <Label htmlFor="prescription" className="cursor-pointer">Prescription Medicines</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={applyFilters} className="flex-1">Apply Filters</Button>
                <Button variant="outline" onClick={resetFilters}>Reset</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MedicineFilters;
