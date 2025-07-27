import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSpecialty: string;
  onSpecialtyChange: (value: string) => void;
  selectedAvailability: string;
  onAvailabilityChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
}

const specialties = [
  "All Specialties",
  "General Medicine",
  "Cardiology",
  "Dermatology", 
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Surgery"
];

export const SearchFilters = ({
  searchTerm,
  onSearchChange,
  selectedSpecialty,
  onSpecialtyChange,
  selectedAvailability,
  onAvailabilityChange,
  sortBy,
  onSortChange,
  onClearFilters
}: SearchFiltersProps) => {
  const hasActiveFilters = searchTerm || selectedSpecialty !== "All Specialties" || selectedAvailability || sortBy !== "distance";

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search doctors by name or specialty..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Specialty</label>
          <Select value={selectedSpecialty} onValueChange={onSpecialtyChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Availability</label>
          <Select value={selectedAvailability} onValueChange={onAvailabilityChange}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="available">Available Now</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Sort By</label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
              <SelectItem value="fee">Consultation Fee</SelectItem>
              <SelectItem value="availability">Availability</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-end">
          <Button variant="outline" className="w-full">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>
      
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchTerm}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onSearchChange("")} />
            </Badge>
          )}
          {selectedSpecialty !== "All Specialties" && (
            <Badge variant="secondary" className="gap-1">
              {selectedSpecialty}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onSpecialtyChange("All Specialties")} />
            </Badge>
          )}
          {selectedAvailability && (
            <Badge variant="secondary" className="gap-1">
              {selectedAvailability}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onAvailabilityChange("")} />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};