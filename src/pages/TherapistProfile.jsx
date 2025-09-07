import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Award, 
  Calendar as CalendarIcon,
  Edit,
  Settings,
  Activity,
  Heart
} from "lucide-react";

const therapistData = {
  personalInfo: {
    fullName: "Dr. Kavitha Reddy",
    mobile: "+91 9876543210",
    email: "kavitha.reddy@ayurtherapy.com",
    gender: "Female",
    location: "Bangalore, Karnataka",
    bio: "Dedicated Ayurvedic therapist with 8+ years of experience in Panchakarma treatments. Specialized in Virechana and Basti therapies with a holistic approach to healing.",
    joinDate: "2020-03-15",
    certification: "BAMS, MD (Panchakarma)"
  },
  professional: {
    specializations: ["Virechana", "Basti", "Nasya"],
    experience: "6-10",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    workingHours: {
      start: "09:00",
      end: "17:00"
    }
  },
  stats: {
    totalPatients: 245,
    completedSessions: 1420,
    avgRating: 4.8,
    upcomingSessions: 12
  },
  availability: {
    unavailableDates: [
      new Date(2024, 0, 28), // Jan 28
      new Date(2024, 0, 29), // Jan 29
      new Date(2024, 1, 5),  // Feb 5
    ]
  }
};

export default function TherapistProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDates, setSelectedDates] = useState([]);
  const [date, setDate] = useState(new Date());

  const getSpecializationColor = (spec) => {
    const colors = {
      "Virechana": "therapy-virechana",
      "Basti": "therapy-basti", 
      "Nasya": "therapy-nasya",
      "Vamana": "therapy-vamana",
      "Raktamokshana": "therapy-raktamokshana"
    };
    return colors[spec] || "primary";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-accent to-secondary p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <User className="h-8 w-8 text-primary" />
            Therapist Profile
          </h1>
          <p className="text-muted-foreground text-lg">Manage your professional profile and availability</p>
        </div>

        {/* Profile Overview Card */}
        <Card className="shadow-xl mb-8 bg-gradient-to-r from-card to-muted/30">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{therapistData.personalInfo.fullName}</CardTitle>
                  <p className="text-primary-foreground/80">{therapistData.personalInfo.certification}</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-primary-soft rounded-lg">
                <div className="text-2xl font-bold text-primary">{therapistData.stats.totalPatients}</div>
                <div className="text-sm text-muted-foreground">Total Patients</div>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">{therapistData.stats.completedSessions}</div>
                <div className="text-sm text-muted-foreground">Sessions Completed</div>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <div className="text-2xl font-bold text-warning">{therapistData.stats.avgRating}</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center p-4 bg-status-ongoing/10 rounded-lg">
                <div className="text-2xl font-bold" style={{ color: `hsl(var(--status-ongoing))` }}>
                  {therapistData.stats.upcomingSessions}
                </div>
                <div className="text-sm text-muted-foreground">Upcoming Sessions</div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <span className="font-medium">{therapistData.personalInfo.mobile}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span className="font-medium">{therapistData.personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Location:</span>
                  <span className="font-medium">{therapistData.personalInfo.location}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Experience:</span>
                  <span className="font-medium">{therapistData.professional.experience} years</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Working Hours:</span>
                  <span className="font-medium">
                    {therapistData.professional.workingHours.start} - {therapistData.professional.workingHours.end}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Heart className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm text-muted-foreground">Specializations:</span>
                  <div className="flex flex-wrap gap-1">
                    {therapistData.professional.specializations.map((spec, index) => (
                      <Badge 
                        key={index}
                        className="text-white text-xs"
                        style={{ backgroundColor: `hsl(var(--${getSpecializationColor(spec)}))` }}
                      >
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Tabs */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <Card className="bg-gradient-to-r from-accent to-muted">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">About Me</h3>
                      <p className="text-foreground leading-relaxed">
                        {therapistData.personalInfo.bio}
                      </p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          Professional Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Joined:</span>
                          <div className="font-medium">
                            {new Date(therapistData.personalInfo.joinDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Certification:</span>
                          <div className="font-medium">{therapistData.personalInfo.certification}</div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Working Days:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {therapistData.professional.workingDays.map((day, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {day.substring(0, 3)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="h-5 w-5" />
                          Performance Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Patient Satisfaction:</span>
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-warning">{therapistData.stats.avgRating}</span>
                            <span className="text-xs text-muted-foreground">/5.0</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Session Completion Rate:</span>
                          <span className="font-bold text-success">98%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Monthly Sessions:</span>
                          <span className="font-bold text-primary">45 avg</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Weekly Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Working Days</h4>
                        <div className="space-y-2">
                          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                            <div key={day} className="flex items-center justify-between p-2 rounded">
                              <span className="font-medium">{day}</span>
                              <Badge 
                                variant={therapistData.professional.workingDays.includes(day) ? "default" : "secondary"}
                                className={therapistData.professional.workingDays.includes(day) ? "bg-success text-success-foreground" : ""}
                              >
                                {therapistData.professional.workingDays.includes(day) ? "Available" : "Off"}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Daily Schedule</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span>Start Time:</span>
                            <span className="font-medium">{therapistData.professional.workingHours.start}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>End Time:</span>
                            <span className="font-medium">{therapistData.professional.workingHours.end}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Break Time:</span>
                            <span className="font-medium">12:00 - 13:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Session Duration:</span>
                            <span className="font-medium">60 minutes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        Availability Calendar
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={therapistData.availability.unavailableDates}
                        className="rounded-md border"
                      />
                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>• Gray dates are unavailable</p>
                        <p>• Click dates to toggle availability</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Unavailable Dates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {therapistData.availability.unavailableDates.map((date, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-destructive/10 rounded border border-destructive/20">
                            <div>
                              <div className="font-medium">{date.toLocaleDateString()}</div>
                              <div className="text-sm text-muted-foreground">Personal Leave</div>
                            </div>
                            <Button variant="outline" size="sm">
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      <Button className="w-full mt-4" variant="outline">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Add Unavailable Date
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Account Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Personal Information
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Clock className="h-4 w-4 mr-2" />
                        Update Working Hours
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Heart className="h-4 w-4 mr-2" />
                        Modify Specializations
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Notification Preferences
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}