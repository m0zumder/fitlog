"use client";
import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import Link from "next/link";
import { Check, X, Eye } from "lucide-react";

export default function MyPlan() {
  const { planned, saved, removeFromPlan, markAsDone } = useWorkout();
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');

  const displayList = activeTab === 'plan' ? planned : saved;
  const totalExercises = planned.length;
  const totalMinutes = planned.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = planned.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold uppercase">My Plan</h1>
        <p className="text-gray-400 mt-2">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="bg-[#111] p-6 rounded-xl border border-gray-800 text-center">
          <p className="text-gray-500 text-sm mb-1">Exercises</p>
          <p className="text-3xl font-bold text-[#ccff00]">{totalExercises}<span className="text-lg text-gray-400">/5</span></p>
        </div>
        <div className="bg-[#111] p-6 rounded-xl border border-gray-800 text-center">
          <p className="text-gray-500 text-sm mb-1">Minutes</p>
          <p className="text-3xl font-bold text-white">{totalMinutes}</p>
        </div>
        <div className="bg-[#111] p-6 rounded-xl border border-gray-800 text-center">
          <p className="text-gray-500 text-sm mb-1">Calories</p>
          <p className="text-3xl font-bold text-white">{totalCalories}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 mb-6">
        <button 
          onClick={() => setActiveTab('plan')} 
          className={`pb-4 px-6 font-bold ${activeTab === 'plan' ? 'text-[#ccff00] border-b-2 border-[#ccff00]' : 'text-gray-500 hover:text-white'}`}
        >
          Today's Plan
        </button>
        <button 
          onClick={() => setActiveTab('saved')} 
          className={`pb-4 px-6 font-bold ${activeTab === 'saved' ? 'text-[#ccff00] border-b-2 border-[#ccff00]' : 'text-gray-500 hover:text-white'}`}
        >
          Saved
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {displayList.length === 0 ? (
          <div className="text-center py-20 bg-[#111] rounded-xl border border-gray-800">
            <h3 className="text-xl font-bold text-gray-300 mb-2">NOTHING HERE YET</h3>
            <p className="text-gray-500 mb-6">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="px-6 py-3 bg-[#ccff00] text-black font-bold rounded-md">Go to workouts</Link>
          </div>
        ) : (
          displayList.map((workout) => (
            <div key={workout.id} className="flex items-center justify-between p-4 bg-[#111] border border-gray-800 rounded-xl">
              <div className="flex items-center gap-4">
                <img src={workout.image} alt={workout.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="font-bold uppercase">{workout.name}</h4>
                  <p className="text-sm text-gray-500">{workout.equipment}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link href={`/workout/${workout.id}`} className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 text-white" title="View Details">
                  <Eye size={18} />
                </Link>
                {/* Mark as Done is only visible in Today's Plan tab */}
                {activeTab === 'plan' && (
                  <button onClick={() => markAsDone(workout.id)} className="p-2 bg-[#ccff00] text-black rounded-md hover:bg-yellow-400" title="Mark as Done">
                    <Check size={18} />
                  </button>
                )}
                <button onClick={() => removeFromPlan(workout.id, activeTab)} className="p-2 bg-red-900/30 text-red-500 rounded-md hover:bg-red-900/50" title="Remove">
                  <X size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}