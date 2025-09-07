import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FeedbackModal } from "@/components/FeedbackModal";
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  AlertTriangle,
  CheckCircle,
  PlayCircle,
  Circle,
  Activity,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockSessions = [
  {
    id: 1,
    timeSlot: "09:00 AM - 10:00 AM",
    patientName: "Priya Sharma",
    therapyType: "virechana",
    roomBed: "Room 101 - Bed A",
    preCareInstructions: "Fasting required, no water 2 hours before",
    status: "pending",
    patientId: "P001"
  },
  {
    id: 2,
    timeSlot: "10:30 AM - 11:30 AM",
    patientName: "Raj Kumar",
    therapyType: "nasya",
    roomBed: "Room 102 - Bed B",
    preCareInstructions: "Light breakfast, oil preparation needed",
    status: "ongoing",
    patientId: "P002"
  },
  {
    id: 3,
    timeSlot: "12:00 PM - 01:00 PM",
    patientName: "Meera Patel",
    therapyType: "basti",
    roomBed: "Room 103 - Bed C",
    preCareInstructions: "Empty stomach, warm oil massage prep",
    status: "completed",
    patientId: "P003"
  },
  {
    id: 4,
    timeSlot: "02:30 PM - 03:30 PM",
    patientName: "Arjun Singh",
    therapyType: "vamana",
    roomBed: "Room 101 - Bed A",
    preCareInstructions: "Strict fasting, emotional preparation",
    status: "pending",
    patientId: "P004"
  },
  {
    id: 5,
    timeSlot: "04:00 PM - 05:00 PM",
    patientName: "Kavita Joshi",
    therapyType: "raktamokshana",
    roomBed: "Room 104 - Bed D",
    preCareInstructions: "Blood parameters checked, sterile setup",
    status: "pending",
    patientId: "P005"
  },
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

const getStatusIcon = (status) => {
  switch (status) {
    case "pending": return <Circle className="h-4 w-4" />;
    case "ongoing": return <PlayCircle className="h-4 w-4" />;
    case "completed": return <CheckCircle className="h-4 w-4" />;
    default: return <Circle className="h-4 w-4" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "pending": return "status-pending";
    case "ongoing": return "status-ongoing";
    case "completed": return "status-completed";
    default: return "muted";
  }
};

export default function TodaySchedule() {
  const [sessions, setSessions] = useState(mockSessions);
  const [selectedSession, setSelectedSession] = useState(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackSession, setFeedbackSession] = useState(null);

  const updateSessionStatus = (sessionId, newStatus) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === sessionId 
          ? { ...session, status: newStatus }
          : session
      )
    );
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const statusCounts = sessions.reduce((acc, session) => {
    acc[session.status] = (acc[session.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-accent to-secondary p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Calendar className="h-8 w-8 text-primary" />
                Today's Schedule
              </h1>
              <p className="text-muted-foreground text-lg">{today}</p>
            </div>
            
            {/* Status Summary */}
            <div className="flex gap-4">
              <div className={cn("px-4 py-2 rounded-lg bg-status-pending/10 border-l-4", "border-status-pending")}>
                <div className="text-2xl font-bold" style={{ color: `hsl(var(--status-pending))` }}>
                  {statusCounts.pending || 0}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div className={cn("px-4 py-2 rounded-lg bg-status-ongoing/10 border-l-4", "border-status-ongoing")}>
                <div className="text-2xl font-bold" style={{ color: `hsl(var(--status-ongoing))` }}>
                  {statusCounts.ongoing || 0}
                </div>
                <div className="text-sm text-muted-foreground">Ongoing</div>
              </div>
              <div className={cn("px-4 py-2 rounded-lg bg-status-completed/10 border-l-4", "border-status-completed")}>
                <div className="text-2xl font-bold" style={{ color: `hsl(var(--status-completed))` }}>
                  {statusCounts.completed || 0}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="grid gap-6">
          {sessions.map((session) => (
            <Card key={session.id} className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-card to-muted/30 border-l-4" style={{ borderLeftColor: `hsl(var(--${getTherapyColor(session.therapyType)}))` }}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                  {/* Time Slot */}
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">{session.timeSlot}</div>
                    </div>
                  </div>

                  {/* Patient Name */}
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">{session.patientName}</div>
                      <div className="text-sm text-muted-foreground">ID: {session.patientId}</div>
                    </div>
                  </div>

                  {/* Therapy Type */}
                  <div>
                    <Badge 
                      className="capitalize font-medium text-white"
                      style={{ backgroundColor: `hsl(var(--${getTherapyColor(session.therapyType)}))` }}
                    >
                      {session.therapyType}
                    </Badge>
                  </div>

                  {/* Room/Bed */}
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div className="text-sm text-foreground">{session.roomBed}</div>
                  </div>

                  {/* Pre-care Instructions */}
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <div className="text-sm text-foreground">{session.preCareInstructions}</div>
                  </div>

                  {/* Status Actions */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {["pending", "ongoing", "completed"].map((status) => (
                        <Button
                          key={status}
                          size="sm"
                          variant={session.status === status ? "default" : "outline"}
                          onClick={() => updateSessionStatus(session.id, status)}
                          className={cn(
                            "capitalize transition-all duration-200",
                            session.status === status && "shadow-md"
                          )}
                          style={session.status === status ? {
                            backgroundColor: `hsl(var(--status-${status}))`,
                            color: "white"
                          } : {}}
                        >
                          {getStatusIcon(status)}
                          <span className="ml-1 hidden sm:inline">{status}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-4 pt-4 border-t border-border flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedSession(session)}
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    <Activity className="h-4 w-4 mr-1" />
                    View Patient Details
                  </Button>
                  {session.status === "completed" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setFeedbackSession(session);
                        setFeedbackModalOpen(true);
                      }}
                      className="hover:bg-success hover:text-success-foreground"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Add Feedback
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sessions.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Sessions Scheduled</h3>
              <p className="text-muted-foreground">You have no therapy sessions scheduled for today.</p>
            </CardContent>
          </Card>
        )}

        {/* Feedback Modal */}
        <FeedbackModal
          isOpen={feedbackModalOpen}
          onClose={() => {
            setFeedbackModalOpen(false);
            setFeedbackSession(null);
          }}
          session={feedbackSession}
        />
      </div>
    </div>
  );
}