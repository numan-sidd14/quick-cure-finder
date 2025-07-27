import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Star, DollarSign, Users } from "lucide-react";
import doctorPlaceholder from "@/assets/doctor-placeholder.jpg";

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    experience: number;
    rating: number;
    reviews: number;
    distance: string;
    availability: 'available' | 'busy' | 'offline';
    consultationFee: number;
    workingHours: string;
    currentPatients: number;
    estimatedWait: string;
    image?: string;
  };
  onViewDetails: (doctorId: string) => void;
}

export const DoctorCard = ({ doctor, onViewDetails }: DoctorCardProps) => {
  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success text-success-foreground';
      case 'busy': return 'bg-warning text-warning-foreground';
      case 'offline': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAvailabilityText = (status: string) => {
    switch (status) {
      case 'available': return 'Available Now';
      case 'busy': return `Busy - ${doctor.estimatedWait} wait`;
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={doctor.image || doctorPlaceholder}
              alt={doctor.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-border"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
              doctor.availability === 'available' ? 'bg-success' : 
              doctor.availability === 'busy' ? 'bg-warning' : 'bg-muted'
            }`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
              Dr. {doctor.name}
            </h3>
            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="text-sm font-medium">{doctor.rating}</span>
                <span className="text-sm text-muted-foreground">({doctor.reviews})</span>
              </div>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{doctor.experience} years</span>
            </div>
          </div>
          
          <Badge className={getAvailabilityColor(doctor.availability)}>
            {getAvailabilityText(doctor.availability)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{doctor.distance}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">${doctor.consultationFee}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{doctor.workingHours}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{doctor.currentPatients} in queue</span>
          </div>
        </div>
        
        <Button 
          onClick={() => onViewDetails(doctor.id)}
          className="w-full"
          variant={doctor.availability === 'available' ? 'default' : 'secondary'}
        >
          {doctor.availability === 'available' ? 'Book Appointment' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  );
};