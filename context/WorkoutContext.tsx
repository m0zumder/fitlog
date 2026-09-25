"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type WorkoutContextType = {
  planned: any[];
  saved: any[];
  addToPlan: (workout: any) => void;
  saveForLater: (workout: any) => void;
  removeFromPlan: (id: number, type: 'plan' | 'saved') => void;
  markAsDone: (id: number) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [planned, setPlanned] = useState<any[]>([]);
  const [saved, setSaved] = useState<any[]>([]);

  useEffect(() => {
    const localPlanned = localStorage.getItem("plannedWorkouts");
    const localSaved = localStorage.getItem("savedWorkouts");
    if (localPlanned) setPlanned(JSON.parse(localPlanned));
    if (localSaved) setSaved(JSON.parse(localSaved));
  }, []);

  useEffect(() => {
    localStorage.setItem("plannedWorkouts", JSON.stringify(planned));
    localStorage.setItem("savedWorkouts", JSON.stringify(saved));
  }, [planned, saved]);

  const addToPlan = (workout: any) => {
    if (planned.length >= 5) {
      toast.error("You can only add up to 5 lifts for today!");
      return;
    }
    if (planned.find((item) => item.id === workout.id)) {
      toast.info("Workout already in today's plan");
      return;
    }
    setPlanned([...planned, workout]);
    toast.success(`${workout.name} added to today's plan`);
  };

  const saveForLater = (workout: any) => {
    if (saved.find((item) => item.id === workout.id)) return;
    setSaved([...saved, workout]);
    toast.success(`${workout.name} saved for later`);
  };

  const removeFromPlan = (id: number, type: 'plan' | 'saved') => {
    if (type === 'plan') {
      setPlanned(planned.filter((w) => w.id !== id));
    } else {
      setSaved(saved.filter((w) => w.id !== id));
    }
    toast.error("Workout removed");
  };

  const markAsDone = (id: number) => {
    setPlanned(planned.filter((w) => w.id !== id));
    toast.success("Workout marked as done! Great job!");
  };

  return (
    <WorkoutContext.Provider value={{ planned, saved, addToPlan, saveForLater, removeFromPlan, markAsDone }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error("useWorkout must be used within WorkoutProvider");
  return context;
};