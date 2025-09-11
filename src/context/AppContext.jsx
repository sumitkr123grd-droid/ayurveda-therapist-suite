import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [therapistData, setTherapistData] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("therapistData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setTherapistData(parsed);
        setIsRegistered(true);
        console.log("=== LOADED THERAPIST DATA FROM STORAGE ===");
        console.log(parsed);
        console.log("==========================================");
      } catch (error) {
        console.error("Error parsing saved therapist data:", error);
      }
    }
  }, []);

  const saveTherapistData = (data) => {
    const processedData = {
      ...data,
      registrationDate: new Date().toISOString(),
      stats: {
        totalPatients: 0,
        completedSessions: 0,
        avgRating: 0,
        upcomingSessions: 0
      }
    };
    
    setTherapistData(processedData);
    setIsRegistered(true);
    localStorage.setItem("therapistData", JSON.stringify(processedData));
    
    console.log("=== THERAPIST REGISTRATION DATA SAVED ===");
    console.log("Full Name:", processedData.fullName);
    console.log("Mobile:", processedData.mobile);
    console.log("Email:", processedData.email);
    console.log("Gender:", processedData.gender);
    console.log("Specializations:", processedData.specializations);
    console.log("Experience:", processedData.experience);
    console.log("Working Days:", processedData.workingDays);
    console.log("Working Hours:", processedData.startTime, "-", processedData.endTime);
    console.log("Location:", processedData.location);
    console.log("Bio:", processedData.bio);
    console.log("Registration Date:", processedData.registrationDate);
    console.log("=========================================");
  };

  const updateTherapistData = (updates) => {
    const updatedData = { ...therapistData, ...updates };
    setTherapistData(updatedData);
    localStorage.setItem("therapistData", JSON.stringify(updatedData));
    
    console.log("=== THERAPIST DATA UPDATED ===");
    console.log("Updated fields:", Object.keys(updates));
    console.log("New data:", updatedData);
    console.log("==============================");
  };

  const value = {
    therapistData,
    isRegistered,
    saveTherapistData,
    updateTherapistData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};