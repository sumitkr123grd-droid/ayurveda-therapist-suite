import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { useAppContext } from "@/context/AppContext";
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

// Default data for when no registration exists
const defaultTherapistData = {
  fullName: "Not Registered",
  mobile: "N/A",
  email: "N/A",
  gender: "N/A",
  location: "N/A",
  bio: "Please complete your registration to view your profile.",
  specializations: [],
  experience: "N/A",
  workingDays: [],
  startTime: "N/A",
  endTime: "N/A",
  registrationDate: null,
  stats: {
    totalPatients: 0,
    completedSessions: 0,
    avgRating: 0,
    upcomingSessions: 0
  }
};

export default function TherapistProfile() {
  const { therapistData, isRegistered } = useAppContext();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDates, setSelectedDates] = useState([]);
  const [date, setDate] = useState(new Date());

  // Use registered data or default data
  const displayData = isRegistered ? therapistData : defaultTherapistData;

  const getSpecializationColor = (spec) => {
    const colors = {
      "virechana": "therapy-virechana",
      "basti": "therapy-basti", 
      "nasya": "therapy-nasya",
      "vamana": "therapy-vamana",
      "raktamokshana": "therapy-raktamokshana"
    };
    return colors[spec.toLowerCase()] || "primary";
  };

  const logProfileData = () => {
    console.log("=== THERAPIST PROFILE DATA ===");
    console.log("Is Registered:", isRegistered);
    console.log("Full Name:", displayData.fullName);
    console.log("Mobile:", displayData.mobile);
    console.log("Email:", displayData.email);
    console.log("Gender:", displayData.gender);
    console.log("Location:", displayData.location);
    console.log("Bio:", displayData.bio);
    console.log("Specializations:", displayData.specializations);
    console.log("Experience:", displayData.experience);
    console.log("Working Days:", displayData.workingDays);
    console.log("Working Hours:", displayData.startTime, "-", displayData.endTime);
    console.log("Stats:", displayData.stats);
    console.log("Registration Date:", displayData.registrationDate);
    console.log("==============================");
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

        {!isRegistered && (
          <Card className="mb-8 border-warning/50 bg-warning/5">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-warning mb-2">Profile Not Complete</h3>
                <p className="text-muted-foreground mb-4">Please complete your registration to view your full profile.</p>
                <Button 
                  onClick={() => window.location.href = "/registration"}
                  className="bg-warning text-warning-foreground hover:bg-warning/90"
                >
                  Complete Registration
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Overview Card */}
        <Card className="shadow-xl mb-8 bg-gradient-to-r from-card to-muted/30">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{displayData.fullName}</CardTitle>
                  <p className="text-primary-foreground/80">
                    {isRegistered ? `Experience: ${displayData.experience} years` : "Not Registered"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={logProfileData}>
                  Send to Terminal
                </Button>
                <Button variant="secondary" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-primary-soft rounded-lg">
                <div className="text-2xl font-bold text-primary">{displayData.stats.totalPatients}</div>
                <div className="text-sm text-muted-foreground">Total Patients</div>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">{displayData.stats.completedSessions}</div>
                <div className="text-sm text-muted-foreground">Sessions Completed</div>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <div className="text-2xl font-bold text-warning">{displayData.stats.avgRating || "N/A"}</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center p-4 bg-status-ongoing/10 rounded-lg">
                <div className="text-2xl font-bold" style={{ color: `hsl(var(--status-ongoing))` }}>
                  {displayData.stats.upcomingSessions}
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
                  <span className="font-medium">{displayData.mobile}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span className="font-medium">{displayData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Location:</span>
                  <span className="font-medium">{displayData.location || "Not specified"}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Experience:</span>
                  <span className="font-medium">{displayData.experience} years</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Working Hours:</span>
                  <span className="font-medium">
                    {isRegistered && displayData.startTime && displayData.endTime 
                      ? `${displayData.startTime} - ${displayData.endTime}`
                      : "Not specified"
                    }
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Heart className="h-4 w-4 text-primary mt-1" />
                  <span className="text-sm text-muted-foreground">Specializations:</span>
                  <div className="flex flex-wrap gap-1">
                    {isRegistered && displayData.specializations && displayData.specializations.length > 0 ? (
                      displayData.specializations.map((spec, index) => (
                        <Badge 
                          key={index}
                          className="text-white text-xs"
                          style={{ backgroundColor: `hsl(var(--${getSpecializationColor(spec)}))` }}
                        >
                          {spec}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">Not specified</span>
                    )}
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
                          {displayData.bio || "No bio available. Please update your profile."}
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
                            <span className="text-sm text-muted-foreground">Registered:</span>
                            <div className="font-medium">
                              {isRegistered && displayData.registrationDate 
                                ? new Date(displayData.registrationDate).toLocaleDateString()
                                : "Not registered"
                              }
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Experience Level:</span>
                            <div className="font-medium">{displayData.experience}</div>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Working Days:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {isRegistered && displayData.workingDays && displayData.workingDays.length > 0 ? (
                                displayData.workingDays.map((day, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {day.substring(0, 3)}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-sm text-muted-foreground">Not specified</span>
                              )}
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
                              <span className="font-bold text-warning">{displayData.stats.avgRating || "N/A"}</span>
                              <span className="text-xs text-muted-foreground">/5.0</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Session Completion Rate:</span>
                            <span className="font-bold text-success">{isRegistered ? "98%" : "N/A"}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Monthly Sessions:</span>
                            <span className="font-bold text-primary">{isRegistered ? "45 avg" : "N/A"}</span>
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
                                variant={isRegistered && displayData.workingDays && displayData.workingDays.includes(day.toLowerCase()) ? "default" : "secondary"}
                                className={isRegistered && displayData.workingDays && displayData.workingDays.includes(day.toLowerCase()) ? "bg-success text-success-foreground" : ""}
                              >
                                {isRegistered && displayData.workingDays && displayData.workingDays.includes(day.toLowerCase()) ? "Available" : "Off"}
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
                            <span className="font-medium">{displayData.startTime || "Not set"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>End Time:</span>
                            <span className="font-medium">{displayData.endTime || "Not set"}</span>
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
                        disabled={[]} // No disabled dates for now
                        className="rounded-md border"
                      />
                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>• Click dates to manage availability</p>
                        <p>• Set your schedule preferences</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Unavailable Dates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No unavailable dates set</p>
                          <p className="text-sm text-muted-foreground">Manage your leave and unavailable dates here</p>
                        </div>
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