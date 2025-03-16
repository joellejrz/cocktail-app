import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  GlassWater,
  Music,
  Moon,
  PartyPopper,
  Heart,
  Coffee,
  Sparkles,
} from "lucide-react";

interface MoodOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface MoodSelectionInterfaceProps {
  onMoodSelect?: (mood: MoodOption) => void;
  selectedMood?: string | null;
}

const MoodSelectionInterface = ({
  onMoodSelect = () => {},
  selectedMood = null,
}: MoodSelectionInterfaceProps) => {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);

  const moodOptions: MoodOption[] = [
    {
      id: "relaxation",
      name: "Relaxation",
      description: "Unwind and destress with calming drink options",
      icon: <Moon className="h-8 w-8" />,
      color: "bg-blue-400/20",
    },
    {
      id: "party",
      name: "Party",
      description: "Energetic and fun drinks for celebrations",
      icon: <PartyPopper className="h-8 w-8" />,
      color: "bg-purple-400/20",
    },
    {
      id: "date-night",
      name: "Date Night",
      description: "Romantic and sophisticated options for two",
      icon: <Heart className="h-8 w-8" />,
      color: "bg-pink-400/20",
    },
    {
      id: "refreshing",
      name: "Refreshing",
      description: "Cool and revitalizing drinks for hot days",
      icon: <GlassWater className="h-8 w-8" />,
      color: "bg-cyan-400/20",
    },
    {
      id: "energizing",
      name: "Energizing",
      description: "Boost your energy with these invigorating options",
      icon: <Coffee className="h-8 w-8" />,
      color: "bg-amber-400/20",
    },
    {
      id: "special",
      name: "Special Occasion",
      description: "Premium drinks for memorable moments",
      icon: <Sparkles className="h-8 w-8" />,
      color: "bg-yellow-400/20",
    },
  ];

  const handleMoodSelect = (mood: MoodOption) => {
    onMoodSelect(mood);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-6 bg-gray-900 text-white rounded-xl">
      <div className="mb-8 text-center">
        <motion.h2
          className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How are you feeling today?
        </motion.h2>
        <motion.p
          className="text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Select your mood and let our AI recommend the perfect drink experience
          for you
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {moodOptions.map((mood, index) => (
          <motion.div
            key={mood.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card
                    className={cn(
                      "h-48 flex flex-col items-center justify-center p-6 cursor-pointer border-2 transition-all",
                      mood.color,
                      selectedMood === mood.id
                        ? "border-aquamarine ring-2 ring-aquamarine/50"
                        : "border-gray-800",
                      hoveredMood === mood.id
                        ? "border-gray-600"
                        : "border-gray-800",
                    )}
                    onClick={() => handleMoodSelect(mood)}
                    onMouseEnter={() => setHoveredMood(mood.id)}
                    onMouseLeave={() => setHoveredMood(null)}
                  >
                    <div
                      className={cn(
                        "p-4 rounded-full mb-4",
                        selectedMood === mood.id
                          ? "bg-aquamarine/20"
                          : "bg-gray-800/50",
                      )}
                    >
                      {React.cloneElement(mood.icon as React.ReactElement, {
                        className: cn(
                          "h-8 w-8",
                          selectedMood === mood.id
                            ? "text-aquamarine"
                            : "text-gray-300",
                        ),
                      })}
                    </div>
                    <h3 className="text-xl font-medium mb-1">{mood.name}</h3>
                    <div className="h-1 w-12 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full mt-2"></div>
                  </Card>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-gray-800 border-gray-700 text-white p-3"
                >
                  <p>{mood.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          className="bg-transparent border border-gray-700 hover:bg-gray-800 text-gray-300 flex items-center gap-2"
        >
          <Music className="h-4 w-4" />
          Set Ambiance
        </Button>
      </div>
    </div>
  );
};

export default MoodSelectionInterface;
