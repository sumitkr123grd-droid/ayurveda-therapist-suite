import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Star, Send, MessageSquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";

const mockFeedbacks = [
  {
    id: 1,
    patientId: "P001",
    patientName: "Rajesh Kumar",
    therapy: "Vamana",
    date: "2024-01-15",
    comfortRating: 4,
    sideEffects: ["Mild nausea"],
    reliefSigns: ["Reduced congestion", "Better breathing"],
    notes: "Patient responded well to treatment. Minimal discomfort observed.",
    status: "Reviewed"
  },
  {
    id: 2,
    patientId: "P002",
    patientName: "Priya Sharma",
    therapy: "Virechana",
    date: "2024-01-14",
    comfortRating: 5,
    sideEffects: ["None"],
    reliefSigns: ["Improved digestion", "Increased energy"],
    notes: "Excellent response to treatment. Patient felt significant improvement.",
    status: "Pending Review"
  },
  {
    id: 3,
    patientId: "P003",
    patientName: "Mohammed Ali",
    therapy: "Basti",
    date: "2024-01-13",
    comfortRating: 3,
    sideEffects: ["Mild cramping"],
    reliefSigns: ["Joint pain relief"],
    notes: "Some initial discomfort but good therapeutic response.",
    status: "Reviewed"
  }
];

const StarRating = ({ rating, readOnly = true }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-5 w-5 transition-colors",
            star <= rating
              ? "fill-warning text-warning"
              : "text-muted-foreground"
          )}
        />
      ))}
    </div>
  );
};

const FeedbackCard = ({ feedback }) => {
  const getTherapyColor = (therapy) => {
    const colors = {
      Vamana: "bg-therapy-vamana/10 text-therapy-vamana border-therapy-vamana/20",
      Virechana: "bg-therapy-virechana/10 text-therapy-virechana border-therapy-virechana/20",
      Basti: "bg-therapy-basti/10 text-therapy-basti border-therapy-basti/20",
      Nasya: "bg-therapy-nasya/10 text-therapy-nasya border-therapy-nasya/20",
      Raktamokshana: "bg-therapy-raktamokshana/10 text-therapy-raktamokshana border-therapy-raktamokshana/20"
    };
    return colors[therapy] || "bg-muted text-muted-foreground";
  };

  const logFeedbackData = () => {
    console.log("=== FEEDBACK DATA ===");
    console.log("Patient ID:", feedback.patientId);
    console.log("Patient Name:", feedback.patientName);
    console.log("Therapy Type:", feedback.therapy);
    console.log("Date:", feedback.date);
    console.log("Comfort Rating:", feedback.comfortRating);
    console.log("Side Effects:", feedback.sideEffects);
    console.log("Relief Signs:", feedback.reliefSigns);
    console.log("Additional Notes:", feedback.notes);
    console.log("Status:", feedback.status);
    console.log("==================");
  };

  return (
    <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{feedback.patientName}</CardTitle>
            <CardDescription>Patient ID: {feedback.patientId} • {feedback.date}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className={cn("border", getTherapyColor(feedback.therapy))}>
              {feedback.therapy}
            </Badge>
            <Badge variant={feedback.status === "Reviewed" ? "default" : "secondary"}>
              {feedback.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Comfort Rating</h4>
            <StarRating rating={feedback.comfortRating} />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Side Effects</h4>
            <div className="flex flex-wrap gap-1">
              {feedback.sideEffects.map((effect, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {effect}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Relief Signs</h4>
            <div className="flex flex-wrap gap-1">
              {feedback.reliefSigns.map((sign, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                  {sign}
                </Badge>
              ))}
            </div>
          </div>
          
          {feedback.notes && (
            <div>
              <h4 className="text-sm font-medium mb-2">Additional Notes</h4>
              <p className="text-sm text-muted-foreground">{feedback.notes}</p>
            </div>
          )}
          
          <Button 
            onClick={logFeedbackData}
            className="w-full mt-4"
            variant="outline"
          >
            <Send className="h-4 w-4 mr-2" />
            Send to Terminal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const NewFeedbackForm = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    therapy: "",
    comfortRating: 0,
    sideEffects: "",
    reliefSigns: "",
    notes: ""
  });
  const { toast } = useToast();

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, comfortRating: rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const feedbackData = {
      ...formData,
      date: new Date().toISOString().split('T')[0],
      sideEffects: formData.sideEffects.split(',').map(s => s.trim()).filter(s => s),
      reliefSigns: formData.reliefSigns.split(',').map(s => s.trim()).filter(s => s)
    };
    
    console.log("=== NEW FEEDBACK SUBMITTED ===");
    console.log("Patient ID:", feedbackData.patientId);
    console.log("Therapy Type:", feedbackData.therapy);
    console.log("Date:", feedbackData.date);
    console.log("Comfort Rating:", feedbackData.comfortRating);
    console.log("Side Effects:", feedbackData.sideEffects);
    console.log("Relief Signs:", feedbackData.reliefSigns);
    console.log("Additional Notes:", feedbackData.notes);
    console.log("===============================");
    
    toast({
      title: "Feedback Submitted",
      description: "Patient feedback has been recorded and sent to terminal.",
    });
    
    setFormData({
      patientId: "",
      therapy: "",
      comfortRating: 0,
      sideEffects: "",
      reliefSigns: "",
      notes: ""
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquarePlus className="h-5 w-5" />
          Add New Feedback
        </CardTitle>
        <CardDescription>
          Record patient feedback for therapy sessions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Patient ID</label>
              <input
                type="text"
                value={formData.patientId}
                onChange={(e) => setFormData(prev => ({ ...prev, patientId: e.target.value }))}
                className="w-full px-3 py-2 border border-border rounded-md text-sm"
                placeholder="e.g., P001"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Therapy Type</label>
              <Select value={formData.therapy} onValueChange={(value) => setFormData(prev => ({ ...prev, therapy: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select therapy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vamana">Vamana</SelectItem>
                  <SelectItem value="Virechana">Virechana</SelectItem>
                  <SelectItem value="Basti">Basti</SelectItem>
                  <SelectItem value="Nasya">Nasya</SelectItem>
                  <SelectItem value="Raktamokshana">Raktamokshana</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Comfort Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-6 w-6 cursor-pointer transition-colors",
                    star <= formData.comfortRating
                      ? "fill-warning text-warning"
                      : "text-muted-foreground hover:text-warning"
                  )}
                  onClick={() => handleRatingClick(star)}
                />
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Side Effects (comma separated)</label>
            <input
              type="text"
              value={formData.sideEffects}
              onChange={(e) => setFormData(prev => ({ ...prev, sideEffects: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md text-sm"
              placeholder="e.g., Mild nausea, Dizziness"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Relief Signs (comma separated)</label>
            <input
              type="text"
              value={formData.reliefSigns}
              onChange={(e) => setFormData(prev => ({ ...prev, reliefSigns: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md text-sm"
              placeholder="e.g., Reduced pain, Better sleep"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Additional Notes</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any additional observations or comments..."
              className="resize-none"
              rows={3}
            />
          </div>
          
          <Button type="submit" className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Submit Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default function Feedback() {
  const [activeTab, setActiveTab] = useState("view");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patient Feedback</h1>
          <p className="text-muted-foreground">Manage and review therapy session feedback</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={activeTab === "view" ? "default" : "outline"}
            onClick={() => setActiveTab("view")}
          >
            View Feedback
          </Button>
          <Button 
            variant={activeTab === "add" ? "default" : "outline"}
            onClick={() => setActiveTab("add")}
          >
            Add Feedback
          </Button>
        </div>
      </div>

      {activeTab === "view" ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockFeedbacks.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <NewFeedbackForm />
        </div>
      )}
    </div>
  );
}