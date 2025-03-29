
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import DoctorCard from "@/components/doctors/DoctorCard";
import { doctors } from "@/data/doctorData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TextToSpeech from "@/components/common/TextToSpeech";

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [availability, setAvailability] = useState("any");
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const { translate } = useLanguage();

  useEffect(() => {
    // Set page title
    document.title = `${translate("find_doctors")} - MediDrop`;
    
    // Apply initial filters
    filterDoctors();
  }, [searchQuery, specialty, availability]);

  // Get unique specialties from doctors data
  const specialties = Array.from(new Set(doctors.map(doctor => doctor.specialty)));

  const filterDoctors = () => {
    let filtered = [...doctors];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply specialty filter
    if (specialty && specialty !== "all") {
      filtered = filtered.filter(doc => doc.specialty === specialty);
    }
    
    // Apply availability filter (simulated)
    if (availability !== "any") {
      // In a real app, this would check actual appointment availability
      // For demo, we'll just use a random filter
      filtered = filtered.filter(doc => {
        if (availability === "today") {
          return doc.id % 2 === 0; // Even IDs available today
        } else if (availability === "tomorrow") {
          return doc.id % 3 === 0; // Divisible by 3 available tomorrow
        } else if (availability === "week") {
          return true; // All available this week
        }
        return true;
      });
    }
    
    setFilteredDoctors(filtered);
  };

  // Text for the page description that can be read aloud
  const pageDescription = `${translate("find_doctors")}. ${translate("find_doctors_subtitle")}`;

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight mb-2">{translate("find_doctors")}</h1>
            <TextToSpeech text={pageDescription} />
          </div>
          <p className="text-muted-foreground">
            {translate("find_doctors_subtitle")}
          </p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder={translate("search_doctor")}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder={translate("all_specialties")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{translate("all_specialties")}</SelectItem>
                {specialties.map(specialty => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger>
                <SelectValue placeholder={translate("available_today")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">{translate("available_today")}</SelectItem>
                <SelectItem value="tomorrow">{translate("available_tomorrow")}</SelectItem>
                <SelectItem value="week">{translate("available_week")}</SelectItem>
                <SelectItem value="any">{translate("any_availability")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-xl font-medium mb-2">No doctors found</h2>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find available doctors.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Doctors;
