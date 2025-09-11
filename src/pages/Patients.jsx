import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  AlertTriangle, 
  Heart, 
  Clock, 
  FileText,
  Calendar,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockPatients = [
  {
    id: "P001",
    name: "Priya Sharma",
    age: 34,
    gender: "Female",
    phone: "+91 9876543210",
    email: "priya.sharma@email.com",
    address: "Mumbai, Maharashtra",
    prakriti: "Vata-Pitta",
    doshaImbalance: "Excess Vata",
    allergies: ["Sesame Oil", "Dairy Products"],
    currentTherapy: {
      type: "Virechana",
      totalSessions: 7,
      completedSessions: 3,
      startDate: "2024-01-15"
    },
    sessionHistory: [
      { date: "2024-01-15", therapy: "Virechana", status: "completed", notes: "Good response, mild nausea" },
      { date: "2024-01-17", therapy: "Virechana", status: "completed", notes: "Excellent tolerance" },
      { date: "2024-01-19", therapy: "Virechana", status: "completed", notes: "Some fatigue reported" }
    ],
    precautions: [
      "Avoid oil massage - allergic to sesame oil",
      "Monitor blood pressure during treatment",
      "Ensure adequate hydration"
    ]
  },
  {
    id: "P002", 
    name: "Raj Kumar",
    age: 45,
    gender: "Male",
    phone: "+91 9876543211",
    email: "raj.kumar@email.com",
    address: "Delhi, India",
    prakriti: "Kapha-Vata",
    doshaImbalance: "Kapha excess",
    allergies: ["Nuts", "Shellfish"],
    currentTherapy: {
      type: "Nasya",
      totalSessions: 5,
      completedSessions: 1,
      startDate: "2024-01-20"
    },
    sessionHistory: [
      { date: "2024-01-20", therapy: "Nasya", status: "completed", notes: "Good initial response" }
    ],
    precautions: [
      "Breathing exercise before treatment",
      "Check for nasal congestion"
    ]
  }
];

export default function Patients() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  const getProgressPercentage = (completed, total) => {
    return Math.round((completed / total) * 100);
  };

  const logPatientData = (patient) => {
    console.log("=== PATIENT DATA ===");
    console.log("Patient ID:", patient.id);
    console.log("Name:", patient.name);
    console.log("Age:", patient.age);
    console.log("Gender:", patient.gender);
    console.log("Phone:", patient.phone);
    console.log("Email:", patient.email);
    console.log("Address:", patient.address);
    console.log("Prakriti:", patient.prakriti);
    console.log("Dosha Imbalance:", patient.doshaImbalance);
    console.log("Allergies:", patient.allergies);
    console.log("Current Therapy:", patient.currentTherapy);
    console.log("Session History:", patient.sessionHistory);
    console.log("Precautions:", patient.precautions);
    console.log("===================");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-accent to-secondary p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <User className="h-8 w-8 text-primary" />
            Patient Management
          </h1>
          <p className="text-muted-foreground text-lg">Manage patient information and treatment progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient List */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  My Patients
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockPatients.map((patient) => (
                  <Card
                    key={patient.id}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
                      selectedPatient?.id === patient.id 
                        ? "border-primary bg-primary-soft" 
                        : "border-border hover:border-primary/50"
                    )}
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{patient.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {patient.id}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {patient.age} years • {patient.gender}
                      </div>
                      <div className="text-sm font-medium text-primary">
                        {patient.currentTherapy.type} Therapy
                      </div>
                        <div className="text-xs text-muted-foreground">
                          {patient.currentTherapy.completedSessions}/{patient.currentTherapy.totalSessions} sessions
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-muted rounded-full h-2 mt-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${getProgressPercentage(patient.currentTherapy.completedSessions, patient.currentTherapy.totalSessions)}%` 
                            }}
                          />
                        </div>
                        
                        {/* Send Data Button */}
                        <Button 
                          onClick={() => logPatientData(patient)}
                          size="sm" 
                          variant="outline" 
                          className="w-full mt-2 text-xs"
                        >
                          Send to Terminal
                        </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-2">
            {selectedPatient ? (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <User className="h-6 w-6" />
                    {selectedPatient.name} - Patient Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="therapy">Therapy</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                      <TabsTrigger value="precautions">Precautions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="mt-6">
                      <div className="space-y-6">
                        {/* Patient Snapshot Card */}
                        <Card className="bg-gradient-to-r from-accent to-muted border-l-4 border-primary">
                          <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-primary" />
                                    <span className="text-sm text-muted-foreground">Name:</span>
                                    <span className="font-medium">{selectedPatient.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    <span className="text-sm text-muted-foreground">Age:</span>
                                    <span className="font-medium">{selectedPatient.age} years</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-primary" />
                                    <span className="text-sm text-muted-foreground">Gender:</span>
                                    <span className="font-medium">{selectedPatient.gender}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-primary" />
                                    <span className="text-sm text-muted-foreground">Phone:</span>
                                    <span className="font-medium">{selectedPatient.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-primary" />
                                    <span className="text-sm text-muted-foreground">Email:</span>
                                    <span className="font-medium">{selectedPatient.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <span className="text-sm text-muted-foreground">Address:</span>
                                    <span className="font-medium">{selectedPatient.address}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-foreground mb-4">Ayurvedic Profile</h3>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Heart className="h-4 w-4 text-primary" />
                                    <span className="text-sm text-muted-foreground">Prakriti:</span>
                                    <Badge variant="outline" className="bg-primary-soft">
                                      {selectedPatient.prakriti}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-warning" />
                                    <span className="text-sm text-muted-foreground">Dosha Imbalance:</span>
                                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning">
                                      {selectedPatient.doshaImbalance}
                                    </Badge>
                                  </div>
                                </div>

                                {/* Allergies Section */}
                                <div className="mt-4">
                                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-destructive" />
                                    Allergies
                                  </h4>
                                  <div className="space-y-1">
                                    {selectedPatient.allergies.map((allergy, index) => (
                                      <Badge 
                                        key={index} 
                                        variant="destructive" 
                                        className="mr-2 bg-destructive/10 text-destructive border-destructive"
                                      >
                                        {allergy}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="therapy" className="mt-6">
                      <Card className="bg-gradient-to-r from-accent to-muted">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold text-foreground mb-4">Current Therapy Plan</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <span className="text-sm text-muted-foreground">Treatment Type:</span>
                                <div className="font-semibold text-lg text-primary">
                                  {selectedPatient.currentTherapy.type}
                                </div>
                              </div>
                              <div>
                                <span className="text-sm text-muted-foreground">Start Date:</span>
                                <div className="font-medium">
                                  {new Date(selectedPatient.currentTherapy.startDate).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <span className="text-sm text-muted-foreground">Progress:</span>
                                <div className="font-medium">
                                  {selectedPatient.currentTherapy.completedSessions} of {selectedPatient.currentTherapy.totalSessions} sessions
                                </div>
                                <div className="w-full bg-muted rounded-full h-3 mt-2">
                                  <div 
                                    className="bg-primary h-3 rounded-full transition-all duration-500"
                                    style={{ 
                                      width: `${getProgressPercentage(selectedPatient.currentTherapy.completedSessions, selectedPatient.currentTherapy.totalSessions)}%` 
                                    }}
                                  />
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {getProgressPercentage(selectedPatient.currentTherapy.completedSessions, selectedPatient.currentTherapy.totalSessions)}% Complete
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="history" className="mt-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Session History</h3>
                        {selectedPatient.sessionHistory.map((session, index) => (
                          <Card key={index} className="border-l-4 border-primary">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-primary" />
                                  <span className="font-medium">
                                    {new Date(session.date).toLocaleDateString()}
                                  </span>
                                </div>
                                <Badge 
                                  variant="outline"
                                  className="bg-success/10 text-success border-success"
                                >
                                  {session.status}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Therapy: {session.therapy}
                              </div>
                              <div className="text-sm text-foreground">
                                Notes: {session.notes}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="precautions" className="mt-6">
                      <Card className="border-l-4 border-warning bg-warning/5">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-warning" />
                            Precautions & Contraindications
                          </h3>
                          <div className="space-y-3">
                            {selectedPatient.precautions.map((precaution, index) => (
                              <div 
                                key={index}
                                className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20"
                              >
                                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                                <span className="text-foreground">{precaution}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Select a Patient</h3>
                  <p className="text-muted-foreground">Choose a patient from the list to view their details and treatment history.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}