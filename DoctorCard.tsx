
import { Doctor } from "@/data/doctorData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Star, User } from "lucide-react";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card 
      className="h-full transition-all hover:shadow-md cursor-pointer border-2 hover:border-primary/50"
      onClick={() => navigate(`/doctors/${doctor.id}`)}
    >
      <CardHeader className="p-4 pb-0">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(doctor.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-medium">{doctor.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm ml-1">{doctor.rating}</span>
              <span className="text-xs text-muted-foreground ml-2">{doctor.experience} years exp.</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Languages:</span>
            </div>
            <div className="text-sm">{doctor.languages.join(', ')}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Available Today:</span>
            </div>
            <div className="flex flex-wrap gap-1 justify-end">
              {doctor.availableSlots.slice(0, 2).map((slot, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {slot}
                </Badge>
              ))}
              {doctor.availableSlots.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{doctor.availableSlots.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Consultation Fee:</span>
          </div>
          <span className="font-medium">${doctor.consultationFee.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Book Appointment</Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
