import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, DollarSign, Users, Star, MapPin, Phone, Mail } from "lucide-react";
import doctorPlaceholder from "@/assets/doctor-placeholder.jpg";

interface Doctor {
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
  bio?: string;
  education?: string[];
  languages?: string[];
  phone?: string;
  email?: string;
  nextAvailable?: string;
}

interface DoctorModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: (doctorId: string) => void;
}

export const DoctorModal = ({ doctor, isOpen, onClose, onBookAppointment }: DoctorModalProps) => {
  if (!doctor) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Doctor Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Doctor Header */}
          <div className="flex items-start gap-6">
            <img
              src={doctor.image || doctorPlaceholder}
              alt={doctor.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-border"
            />
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">Dr. {doctor.name}</h2>
              <p className="text-lg text-muted-foreground mb-2">{doctor.specialty}</p>
              
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{doctor.experience} years experience</span>
              </div>
              
              <Badge className={getAvailabilityColor(doctor.availability)}>
                {getAvailabilityText(doctor.availability)}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Distance</p>
                <p className="font-medium">{doctor.distance}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Consultation Fee</p>
                <p className="font-medium">${doctor.consultationFee}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Working Hours</p>
                <p className="font-medium">{doctor.workingHours}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Current Queue</p>
                <p className="font-medium">{doctor.currentPatients} patients waiting</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Bio */}
          {doctor.bio && (
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-muted-foreground leading-relaxed">{doctor.bio}</p>
            </div>
          )}

          {/* Education */}
          {doctor.education && doctor.education.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Education</h3>
              <ul className="space-y-1">
                {doctor.education.map((edu, index) => (
                  <li key={index} className="text-muted-foreground">• {edu}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {doctor.languages && doctor.languages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.languages.map((lang, index) => (
                  <Badge key={index} variant="secondary">{lang}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="space-y-2">
              {doctor.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{doctor.phone}</span>
                </div>
              )}
              {doctor.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{doctor.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Next Available */}
          {doctor.nextAvailable && doctor.availability !== 'available' && (
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-medium">Next Available</span>
              </div>
              <p className="text-muted-foreground">{doctor.nextAvailable}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => onBookAppointment(doctor.id)}
              className="flex-1"
              disabled={doctor.availability === 'offline'}
            >
              {doctor.availability === 'available' ? 'Book Now' : 'Join Queue'}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};