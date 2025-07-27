import { useState } from "react";
import { DoctorCard } from "@/components/DoctorCard";
import { DoctorModal } from "@/components/DoctorModal";
import { SearchFilters } from "@/components/SearchFilters";
import { mockDoctors } from "@/data/mockDoctors";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users } from "lucide-react";
import heroMedical from "@/assets/hero-medical.jpg";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [selectedDoctor, setSelectedDoctor] = useState<typeof mockDoctors[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredDoctors = mockDoctors
    .filter(doctor => {
      const matchesSearch = !searchTerm || 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSpecialty = selectedSpecialty === "All Specialties" || 
        doctor.specialty === selectedSpecialty;
      
      const matchesAvailability = !selectedAvailability || 
        doctor.availability === selectedAvailability;
      
      return matchesSearch && matchesSpecialty && matchesAvailability;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return b.experience - a.experience;
        case "fee":
          return a.consultationFee - b.consultationFee;
        case "availability":
          const availabilityOrder = { available: 0, busy: 1, offline: 2 };
          return availabilityOrder[a.availability] - availabilityOrder[b.availability];
        default:
          return parseFloat(a.distance) - parseFloat(b.distance);
      }
    });

  const handleViewDetails = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    if (doctor) {
      setSelectedDoctor(doctor);
      setIsModalOpen(true);
    }
  };

  const handleBookAppointment = (doctorId: string) => {
    const doctor = mockDoctors.find(d => d.id === doctorId);
    if (doctor) {
      if (doctor.availability === 'available') {
        toast({
          title: "Appointment Booked!",
          description: `Your appointment with Dr. ${doctor.name} has been scheduled. You are patient #${doctor.currentPatients + 1} in the queue.`,
        });
      } else if (doctor.availability === 'busy') {
        toast({
          title: "Added to Queue",
          description: `You have been added to Dr. ${doctor.name}'s queue. You are patient #${doctor.currentPatients + 1}. Estimated wait: ${doctor.estimatedWait}`,
        });
      } else {
        toast({
          title: "Doctor Offline",
          description: `Dr. ${doctor.name} is currently offline. Please check back later or choose another doctor.`,
          variant: "destructive"
        });
      }
      setIsModalOpen(false);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialty("All Specialties");
    setSelectedAvailability("");
    setSortBy("distance");
  };

  const availableDoctors = filteredDoctors.filter(d => d.availability === 'available').length;
  const totalPatients = filteredDoctors.reduce((sum, d) => sum + d.currentPatients, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={heroMedical}
          alt="Medical Center"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Find Your Nearest Doctor
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Book appointments with qualified doctors in your area. Real-time availability and queue tracking.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Nearest Locations</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Real-time Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Queue Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{filteredDoctors.length}</div>
              <div className="text-sm text-muted-foreground">Doctors Found</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">{availableDoctors}</div>
              <div className="text-sm text-muted-foreground">Available Now</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">{totalPatients}</div>
              <div className="text-sm text-muted-foreground">Patients in Queue</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Search and Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedSpecialty={selectedSpecialty}
          onSpecialtyChange={setSelectedSpecialty}
          selectedAvailability={selectedAvailability}
          onAvailabilityChange={setSelectedAvailability}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClearFilters={handleClearFilters}
        />

        {/* Results Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Available Doctors ({filteredDoctors.length})
            </h2>
            <p className="text-muted-foreground">
              Showing doctors near your location
            </p>
          </div>
        </div>

        {/* Doctor Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No doctors found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={handleClearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Doctor Details Modal */}
      <DoctorModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookAppointment={handleBookAppointment}
      />
    </div>
  );
};

export default Index;