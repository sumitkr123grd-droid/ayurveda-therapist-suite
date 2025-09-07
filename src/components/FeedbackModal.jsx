import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Star, Heart, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeedbackModal({ isOpen, onClose, session }) {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState({
    comfortRating: 0,
    sideEffects: "",
    reliefSigns: "",
    additionalNotes: ""
  });

  const handleRatingClick = (rating) => {
    setFeedback(prev => ({ ...prev, comfortRating: rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (feedback.comfortRating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a comfort rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Feedback Submitted",
      description: `Feedback for ${session?.patientName} has been recorded and sent to the doctor.`,
      className: "bg-success text-success-foreground",
    });
    
    onClose();
  };

  if (!session) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-6 w-6 text-primary" />
            Session Feedback - {session.patientName}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Session Summary */}
          <div className="bg-accent p-4 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Session Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Therapy Type:</span>
                <span className="ml-2 font-medium capitalize">{session.therapyType}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Time:</span>
                <span className="ml-2 font-medium">{session.timeSlot}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Room/Bed:</span>
                <span className="ml-2 font-medium">{session.roomBed}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Patient ID:</span>
                <span className="ml-2 font-medium">{session.patientId}</span>
              </div>
            </div>
          </div>

          {/* Comfort Rating */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium flex items-center gap-2">
              <Star className="h-4 w-4 text-warning" />
              Comfort Rating (1-5) *
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingClick(rating)}
                  className={cn(
                    "p-2 rounded-lg border-2 transition-all duration-200 hover:scale-105",
                    feedback.comfortRating >= rating
                      ? "border-warning bg-warning text-warning-foreground"
                      : "border-border hover:border-warning/50"
                  )}
                >
                  <Star 
                    className={cn(
                      "h-6 w-6",
                      feedback.comfortRating >= rating ? "fill-current" : ""
                    )} 
                  />
                </button>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              1 = Very Uncomfortable, 5 = Very Comfortable
            </div>
          </div>

          {/* Side Effects */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Side Effects Observed
            </Label>
            <Select onValueChange={(value) => setFeedback(prev => ({ ...prev, sideEffects: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select any side effects observed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="nausea">Nausea</SelectItem>
                <SelectItem value="dizziness">Dizziness</SelectItem>
                <SelectItem value="fatigue">Fatigue</SelectItem>
                <SelectItem value="mild-discomfort">Mild Discomfort</SelectItem>
                <SelectItem value="sweating">Excessive Sweating</SelectItem>
                <SelectItem value="headache">Headache</SelectItem>
                <SelectItem value="other">Other (specify in notes)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Relief Signs */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              Relief Signs Observed
            </Label>
            <Select onValueChange={(value) => setFeedback(prev => ({ ...prev, reliefSigns: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select relief signs observed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No immediate relief</SelectItem>
                <SelectItem value="pain-reduced">Pain Reduced</SelectItem>
                <SelectItem value="breathing-improved">Breathing Improved</SelectItem>
                <SelectItem value="tension-released">Muscle Tension Released</SelectItem>
                <SelectItem value="energy-increased">Energy Level Increased</SelectItem>
                <SelectItem value="mood-improved">Mood Improved</SelectItem>
                <SelectItem value="sleep-better">Better Sleep Quality</SelectItem>
                <SelectItem value="digestion-improved">Digestion Improved</SelectItem>
                <SelectItem value="circulation-better">Better Circulation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Additional Notes */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium">
              Additional Notes & Observations
            </Label>
            <Textarea
              value={feedback.additionalNotes}
              onChange={(e) => setFeedback(prev => ({ ...prev, additionalNotes: e.target.value }))}
              placeholder="Any additional observations, patient responses, or recommendations for future sessions..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Submit Feedback
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}