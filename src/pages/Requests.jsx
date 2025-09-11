import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ClipboardList, 
  User, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle,
  Timer,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockRequests = [
  {
    id: "REQ001",
    patientName: "Anjali Verma",
    patientId: "P006",
    therapyType: "virechana",
    requestedDate: "2024-01-25",
    requestedTime: "10:00 AM - 11:00 AM",
    roomBed: "Room 102 - Bed A",
    duration: "60 minutes",
    urgency: "normal",
    patientAge: 28,
    patientGender: "Female",
    referredBy: "Dr. Sharma",
    notes: "First time virechana treatment. Patient has mild pitta imbalance.",
    status: "pending"
  },
  {
    id: "REQ002",
    patientName: "Vikram Singh",
    patientId: "P007",
    therapyType: "nasya",
    requestedDate: "2024-01-25",
    requestedTime: "02:30 PM - 03:30 PM",
    roomBed: "Room 101 - Bed B",
    duration: "60 minutes",
    urgency: "high",
    patientAge: 42,
    patientGender: "Male",
    referredBy: "Dr. Patel",
    notes: "Follow-up nasya treatment. Patient shows good response to previous sessions.",
    status: "pending"
  },
  {
    id: "REQ003",
    patientName: "Lakshmi Nair",
    patientId: "P008",
    therapyType: "basti",
    requestedDate: "2024-01-26",
    requestedTime: "09:30 AM - 10:30 AM",
    roomBed: "Room 103 - Bed C",
    duration: "60 minutes",
    urgency: "normal",
    patientAge: 35,
    patientGender: "Female",
    referredBy: "Dr. Kumar",
    notes: "Second basti session. Monitor for any digestive discomfort.",
    status: "pending"
  },
  {
    id: "REQ004",
    patientName: "Rohit Agarwal",
    patientId: "P009",
    therapyType: "raktamokshana",
    requestedDate: "2024-01-26",
    requestedTime: "11:00 AM - 12:00 PM",
    roomBed: "Room 104 - Bed D",
    duration: "60 minutes",
    urgency: "high",
    patientAge: 38,
    patientGender: "Male",
    referredBy: "Dr. Iyer",
    notes: "Blood purification therapy. Ensure sterile conditions and pre-treatment blood work.",
    status: "pending"
  }
];

const getTherapyColor = (type) => {
  const colors = {
    vamana: "therapy-vamana",
    virechana: "therapy-virechana", 
    basti: "therapy-basti",
    nasya: "therapy-nasya",
    raktamokshana: "therapy-raktamokshana"
  };
  return colors[type] || "muted";
};

const getUrgencyColor = (urgency) => {
  switch (urgency) {
    case "high": return "destructive";
    case "normal": return "primary";
    case "low": return "muted";
    default: return "muted";
  }
};

export default function Requests() {
  const [requests, setRequests] = useState(mockRequests);
  const { toast } = useToast();

  const handleAcceptRequest = (requestId) => {
    setRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: "accepted" }
          : request
      )
    );
    
    const request = requests.find(r => r.id === requestId);
    console.log("=== REQUEST ACCEPTED ===");
    console.log("Request ID:", request.id);
    console.log("Patient Name:", request.patientName);
    console.log("Patient ID:", request.patientId);
    console.log("Therapy Type:", request.therapyType);
    console.log("Date:", request.requestedDate);
    console.log("Time:", request.requestedTime);
    console.log("Room/Bed:", request.roomBed);
    console.log("Status: ACCEPTED");
    console.log("======================");
    
    toast({
      title: "Request Accepted",
      description: `Therapy session for ${request.patientName} has been accepted and scheduled.`,
      className: "bg-success text-success-foreground",
    });
  };

  const handleRejectRequest = (requestId) => {
    setRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: "rejected" }
          : request
      )
    );
    
    const request = requests.find(r => r.id === requestId);
    console.log("=== REQUEST REJECTED ===");
    console.log("Request ID:", request.id);
    console.log("Patient Name:", request.patientName);
    console.log("Patient ID:", request.patientId);
    console.log("Therapy Type:", request.therapyType);
    console.log("Date:", request.requestedDate);
    console.log("Time:", request.requestedTime);
    console.log("Status: REJECTED");
    console.log("=======================");
    
    toast({
      title: "Request Rejected",
      description: `Therapy request for ${request.patientName} has been rejected.`,
      className: "bg-destructive text-destructive-foreground",
    });
  };

  const pendingRequests = requests.filter(req => req.status === "pending");
  const processedRequests = requests.filter(req => req.status !== "pending");

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-accent to-secondary p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <ClipboardList className="h-8 w-8 text-primary" />
            Therapy Requests
          </h1>
          <p className="text-muted-foreground text-lg">Review and manage incoming therapy session requests</p>
          
          {/* Stats */}
          <div className="flex gap-4 mt-4">
            <div className="px-4 py-2 rounded-lg bg-warning/10 border-l-4 border-warning">
              <div className="text-2xl font-bold text-warning">{pendingRequests.length}</div>
              <div className="text-sm text-muted-foreground">Pending Requests</div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-success/10 border-l-4 border-success">
              <div className="text-2xl font-bold text-success">
                {processedRequests.filter(r => r.status === "accepted").length}
              </div>
              <div className="text-sm text-muted-foreground">Accepted Today</div>
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Timer className="h-6 w-6 text-warning" />
              Pending Requests ({pendingRequests.length})
            </h2>
            <div className="grid gap-6">
              {pendingRequests.map((request) => (
                <Card key={request.id} className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-card to-muted/30 border-l-4" style={{ borderLeftColor: `hsl(var(--${getTherapyColor(request.therapyType)}))` }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {request.patientName}
                        <Badge variant="outline" className="ml-2">
                          {request.patientId}
                        </Badge>
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className="capitalize font-medium text-white"
                          style={{ backgroundColor: `hsl(var(--${getTherapyColor(request.therapyType)}))` }}
                        >
                          {request.therapyType}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={cn(
                            "capitalize",
                            request.urgency === "high" && "border-destructive text-destructive bg-destructive/10",
                            request.urgency === "normal" && "border-primary text-primary bg-primary/10"
                          )}
                        >
                          {request.urgency} priority
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Request Details */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Request Details</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-sm text-muted-foreground">Date:</span>
                            <span className="font-medium">
                              {new Date(request.requestedDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-sm text-muted-foreground">Time:</span>
                            <span className="font-medium">{request.requestedTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Timer className="h-4 w-4 text-primary" />
                            <span className="text-sm text-muted-foreground">Duration:</span>
                            <span className="font-medium">{request.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="text-sm text-muted-foreground">Room/Bed:</span>
                            <span className="font-medium">{request.roomBed}</span>
                          </div>
                        </div>
                      </div>

                      {/* Patient Information */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Patient Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            <span className="text-sm text-muted-foreground">Age/Gender:</span>
                            <span className="font-medium">{request.patientAge} years, {request.patientGender}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            <span className="text-sm text-muted-foreground">Referred by:</span>
                            <span className="font-medium">{request.referredBy}</span>
                          </div>
                          <div className="mt-3">
                            <span className="text-sm text-muted-foreground">Notes:</span>
                            <p className="text-sm text-foreground mt-1 p-2 bg-accent rounded">
                              {request.notes}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                      <Button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="bg-success hover:bg-success/90 text-success-foreground flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept Request
                      </Button>
                      <Button
                        onClick={() => handleRejectRequest(request.id)}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject Request
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Processed Requests */}
        {processedRequests.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-success" />
              Recent Actions
            </h2>
            <div className="grid gap-4">
              {processedRequests.slice(-5).map((request) => (
                <Card key={request.id} className="shadow-md bg-gradient-to-r from-card to-muted/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-semibold text-foreground">{request.patientName}</div>
                          <div className="text-sm text-muted-foreground">
                            {request.therapyType} • {new Date(request.requestedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={request.status === "accepted" ? "default" : "destructive"}
                        className={cn(
                          "capitalize",
                          request.status === "accepted" && "bg-success text-success-foreground"
                        )}
                      >
                        {request.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {requests.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <ClipboardList className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Requests</h3>
              <p className="text-muted-foreground">There are no therapy requests at the moment.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}