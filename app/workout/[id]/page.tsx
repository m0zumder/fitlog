"use client";
import { useEffect, useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import { Clock, Flame, Star, BookmarkPlus, Plus } from "lucide-react";

export default function WorkoutDetails({ params }: { params: { id: string } }) {
  const [workout, setWorkout] = useState<any>(null);
  const { addToPlan, saveForLater } = useWorkout();

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${params.id}`)
      .then((res) => res.json())
      .then((data) => setWorkout(data));
  }, [params.id]);

  if (!workout) return <div className="text-center py-20 text-[#ccff00]">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
        <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex gap-2 mb-4">
            {workout.muscleGroups.map((tag: string) => (
              <span key={tag} className="text-xs uppercase tracking-wider bg-gray-800 px-3 py-1 rounded-full text-gray-300">{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl font-bold uppercase font-oswald">{workout.name}</h1>
          <p className="text-gray-400 mt-2 text-lg">{workout.description}</p>
        </div>

        <div className="bg-[#111] border border-gray-800 rounded-xl p-6 grid grid-cols-2 gap-y-4 text-sm">
          <div><span className="text-gray-500 block">EQUIPMENT</span> {workout.equipment}</div>
          <div><span className="text-gray-500 block">DIFFICULTY</span> {workout.difficulty}</div>
          <div><span className="text-gray-500 block">SETS</span> {workout.sets}</div>
          <div><span className="text-gray-500 block">REPS</span> {workout.reps}</div>
          <div><span className="text-gray-500 block">DURATION</span> {workout.duration} min</div>
          <div><span className="text-gray-500 block">CALORIES</span> {workout.caloriesBurned} kcal</div>
          <div><span className="text-gray-500 block">RATING</span> {workout.rating} / 5.0</div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 uppercase">Instructions</h3>
          <ol className="space-y-3 list-decimal list-inside text-gray-300">
            {workout.instructions.map((step: string, i: number) => (
              <li key={i} className="leading-relaxed pl-2">{step}</li>
            ))}
          </ol>
        </div>

        <div className="flex gap-4">
          <button onClick={() => addToPlan(workout)} className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#ccff00] text-black font-bold rounded-lg hover:bg-yellow-400 transition">
            <Plus size={20} /> Add to today's plan
          </button>
          <button onClick={() => saveForLater(workout)} className="flex-1 flex items-center justify-center gap-2 py-4 bg-transparent border border-gray-600 text-white font-bold rounded-lg hover:bg-gray-800 transition">
            <BookmarkPlus size={20} /> Save for later
          </button>
        </div>
      </div>
    </div>
  );
}