
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import DoctorCard from "@/components/doctors/DoctorCard";
import { doctors } from "@/data/doctorData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const Doctors = () => {
  useEffect(() => {
    // Set page title
    document.title = "Find Doctors - MediDrop";
  }, []);

  // Get unique specialties from doctors data
  const specialties = Array.from(new Set(doctors.map(doctor => doctor.specialty)));

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Find Doctors</h1>
          <p className="text-muted-foreground">
            Connect with experienced healthcare professionals for virtual or in-person consultations.
          </p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search by doctor name" className="pl-8" />
          </div>
          
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Specialties</SelectItem>
                {specialties.map(specialty => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Available Today" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Available Today</SelectItem>
                <SelectItem value="tomorrow">Available Tomorrow</SelectItem>
                <SelectItem value="week">Available This Week</SelectItem>
                <SelectItem value="any">Any Availability</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Doctors;
