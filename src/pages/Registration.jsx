import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Clock, MapPin } from "lucide-react";

const specializations = [
  { id: "vamana", label: "Vamana" },
  { id: "virechana", label: "Virechana" },
  { id: "basti", label: "Basti" },
  { id: "nasya", label: "Nasya" },
  { id: "raktamokshana", label: "Raktamokshana" },
];

const workingDays = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

export default function Registration() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    gender: "",
    specializations: [],
    experience: "",
    workingDays: [],
    startTime: "",
    endTime: "",
    location: "",
    bio: "",
  });

  const handleSpecializationChange = (specializationId, checked) => {
    setFormData(prev => ({
      ...prev,
      specializations: checked
        ? [...prev.specializations, specializationId]
        : prev.specializations.filter(id => id !== specializationId)
    }));
  };

  const handleWorkingDayChange = (dayId, checked) => {
    setFormData(prev => ({
      ...prev,
      workingDays: checked
        ? [...prev.workingDays, dayId]
        : prev.workingDays.filter(id => id !== dayId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Registration Successful!",
      description: "Your therapist profile has been created successfully.",
      className: "bg-success text-success-foreground",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-accent to-secondary p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Therapist Registration
          </h1>
          <p className="text-muted-foreground text-lg">
            Join our Ayurvedic therapy center and help patients on their healing journey
          </p>
        </div>

        <Card className="shadow-xl bg-gradient-to-br from-card to-muted/50">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <UserPlus className="h-6 w-6" />
              Personal & Professional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="border-border focus:ring-primary"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-foreground font-medium">
                    Mobile Number *
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                    className="border-border focus:ring-primary"
                    placeholder="+91 9876543210"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email ID *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="border-border focus:ring-primary"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-foreground font-medium">
                    Gender *
                  </Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger className="border-border">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                  Professional Details
                </h3>

                <div className="space-y-4">
                  <Label className="text-foreground font-medium">
                    Specializations (Select all that apply) *
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {specializations.map((spec) => (
                      <div key={spec.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={spec.id}
                          checked={formData.specializations.includes(spec.id)}
                          onCheckedChange={(checked) => handleSpecializationChange(spec.id, checked)}
                          className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label
                          htmlFor={spec.id}
                          className="text-sm font-medium text-foreground cursor-pointer"
                        >
                          {spec.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-foreground font-medium">
                    Years of Experience *
                  </Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                    <SelectTrigger className="border-border">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Working Days & Timings
                </h3>

                <div className="space-y-4">
                  <Label className="text-foreground font-medium">
                    Working Days *
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {workingDays.map((day) => (
                      <div key={day.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={day.id}
                          checked={formData.workingDays.includes(day.id)}
                          onCheckedChange={(checked) => handleWorkingDayChange(day.id, checked)}
                          className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label
                          htmlFor={day.id}
                          className="text-sm font-medium text-foreground cursor-pointer"
                        >
                          {day.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="startTime" className="text-foreground font-medium">
                      Start Time *
                    </Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                      className="border-border focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTime" className="text-foreground font-medium">
                      End Time *
                    </Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                      className="border-border focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-foreground font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Preferred Location/Center
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="border-border focus:ring-primary"
                    placeholder="e.g., Main Center, Branch Location"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-foreground font-medium">
                    Brief Bio/Introduction
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    className="border-border focus:ring-primary"
                    placeholder="Share your experience, approach, and what makes you unique as a therapist..."
                    rows={4}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold py-3 text-lg shadow-lg"
              >
                Complete Registration
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}