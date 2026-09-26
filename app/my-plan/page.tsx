"use client";
import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import Link from "next/link";
import { Check, X, Eye } from "lucide-react";

export default function MyPlan() {
  const { planned, saved, removeFromPlan, markAsDone } = useWorkout();
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');

   // Currently active list based on selected tab
  const displayList = activeTab === 'plan' ? planned : saved;
  
  // Calculations based on the active tab's list
  const totalExercises = displayList.length;
  const totalMinutes = displayList.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = displayList.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className = "text-center mb-10">
        <h1 className="text-4xl font-bold uppercase font-oswald">My Plan</h1>
        <p className="text-gray-400 mt-2">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      {/* Metrics Summary */}
      <div className ="grid grid-cols-3 gap-4 mt-10">
        <div className="bg-[#111] p-6 rounded -x1 border-gray-800 text-center">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking -wider font-semibold">Exercises</p>
          <p className="text-4xl font-bold text-[#ccff00]">
            {totalExercises}
            {activeTab === 'plan' && <span className="text-xl text-gray-500 font-medium">/5</span>}
          </p>
        </div>
        <div className="bg-[#111] p-6 rounded -x1 border-gray-800 text-center">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking -wider font-semibold">Minutes</p>
          <p className="text-4xl font-bold text-white">{totalMinutes}</p>
        </div>
        <div className="bg-[#111] p-6 rounded -x1 border-gray-800 text-center">
          <p className="text-gray-500 text-sm mb-1 uppercase tracking -wider font-semibold">Calories</p>
          <p className="text-4xl font-bold text-white">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 mb-8">
        <button 
          onClick={() => setActiveTab('plan')} 
          className={`pb-4 px-8 font-bold tracking-wide transition-colors ${activeTab === 'plan' ? 'text-[#ccff00] border-b-2 border-[#ccff00]' : 'text-gray-500 hover:text-white'}`}
        >
          Today's Plan
        </button>
        <button 
          onClick={() => setActiveTab('saved')} 
          className={`pb-4 px-8 font-bold tracking-wide transition-colors ${activeTab === 'saved' ? 'text-[#ccff00] border-b-2 border-[#ccff00]' : 'text-gray-500 hover:text-white'}`}
        >
          Saved
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {displayList.length === 0 ? (
          <div className="text-center py-20 bg-[#111] rounded-xl border border-gray-800">
            <h3 className="text-xl font-bold text-gray-300 mb-2 uppercase">NOTHING HERE YET</h3>
            <p className="text-gray-500 mb-6">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="inline-flex items-center justify-center px-8 py-3 bg-[#ccff00] text-black font-bold rounded hover:bg-[#b3e600] transition-colors uppercase tracking-wide">
              Go to workouts
            </Link>
          </div>
        ) : (
          displayList.map((workout) => (
            <div key={workout.id} className="flex items-center justify-between p-4 bg-[#111] border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                  <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-lg uppercase tracking-wide text-white">{workout.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{workout.equipment}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Link 
                  href={`/workout/${workout.id}`} 
                  className="p-2.5 bg-[#1a1a1a] border border-gray-800 rounded-md hover:border-gray-600 hover:bg-gray-800 text-gray-300 transition-colors" 
                  title="View Details"
                >
                  <Eye size={20} />
                </Link>
                
                {activeTab === 'plan' && (
                  <button 
                    onClick={() => markAsDone(workout.id)} 
                    className="p-2.5 bg-[#ccff00] text-black rounded-md hover:bg-[#b3e600] transition-colors" 
                    title="Mark as Done"
                  >
                    <Check size={20} strokeWidth={3} />
                  </button>
                )}
                
                <button 
                  onClick={() => removeFromPlan(workout.id, activeTab)} 
                  className="p-2.5 bg-red-950/40 border border-red-900/50 text-red-500 rounded-md hover:bg-red-900/80 hover:text-red-400 transition-colors" 
                  title="Remove"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}