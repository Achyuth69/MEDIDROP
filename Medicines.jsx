
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import MedicineCard from "@/components/medicines/MedicineCard";
import MedicineFilters from "@/components/medicines/MedicineFilters";
import { medicines } from "@/data/medicineData";

const Medicines = () => {
  const [filteredMedicines, setFilteredMedicines] = useState(medicines);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Set page title
    document.title = "Browse Medicines - MediDrop";
  }, []);

  const handleFilterChange = (filtered) => {
    setFilteredMedicines(filtered);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    
    if (query === "") {
      setFilteredMedicines(medicines);
    } else {
      const filtered = medicines.filter(med => 
        med.name.toLowerCase().includes(query.toLowerCase()) ||
        med.description.toLowerCase().includes(query.toLowerCase()) ||
        med.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMedicines(filtered);
    }
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Browse Medicines</h1>
          <p className="text-muted-foreground">
            Find and order the medications you need with ease.
          </p>
        </div>
        
        <div className="mb-8">
          <MedicineFilters 
            onFilterChange={handleFilterChange} 
            onSearchChange={handleSearchChange}
          />
        </div>
        
        {filteredMedicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedicines.map(medicine => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-xl font-medium mb-2">No medicines found</h2>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? `No results found for "${searchQuery}". Try a different search term or clear filters.`
                : "No medicines match your current filters. Try adjusting your filters."
              }
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Medicines;
