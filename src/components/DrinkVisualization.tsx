import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal, RotateCcw, X } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface DrinkVisualizationProps {
  drinkName?: string;
  drinkImage?: string;
  ingredients?: string[];
  isVisible?: boolean;
  onClose?: () => void;
}

const DrinkVisualization = ({
  drinkName = "Aquamarine Bliss",
  drinkImage = "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80",
  ingredients = [
    "2 oz Premium Vodka",
    "1 oz Blue Curaçao",
    "0.5 oz Fresh Lime Juice",
    "0.5 oz Simple Syrup",
    "Splash of Soda Water",
    "Lime Wheel for Garnish",
  ],
  isVisible = true,
  onClose = () => {},
}: DrinkVisualizationProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation for drink preparation
  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setAnimationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setRotateX((y - 0.5) * 20); // -10 to 10 degrees
    setRotateY((x - 0.5) * -20); // -10 to 10 degrees
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Simulate gesture controls
  const handleSwipe = (direction: string) => {
    // This would trigger different animations based on swipe direction
    console.log(`Swiped ${direction}`);

    if (direction === "left" || direction === "right") {
      setRotateY(direction === "left" ? 20 : -20);
      setTimeout(() => setRotateY(0), 500);
    } else {
      setRotateX(direction === "up" ? 20 : -20);
      setTimeout(() => setRotateX(0), 500);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
      <Card className="w-full max-w-4xl h-[600px] bg-gray-900 border-gray-800 overflow-hidden relative">
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* 3D Visualization Area */}
          <div
            ref={containerRef}
            className="relative h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="relative w-64 h-64"
              style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateX,
                rotateY,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Glass */}
              <motion.div
                className="absolute w-full h-full rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/30"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(10px)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: animationProgress > 10 ? 1 : 0,
                  scale: animationProgress > 10 ? 1 : 0.8,
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Liquid */}
              <motion.div
                className="absolute bottom-0 w-full rounded-b-full bg-gradient-to-t from-cyan-500 to-blue-400"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(5px)",
                }}
                initial={{ height: "0%" }}
                animate={{
                  height: `${Math.min(animationProgress, 70)}%`,
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Ice cubes */}
              {[1, 2, 3].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white/80 backdrop-blur-md rounded-lg"
                  style={{
                    width: 20 + Math.random() * 10,
                    height: 20 + Math.random() * 10,
                    left: 30 + Math.random() * 150,
                    top: 50 + Math.random() * 100,
                    transformStyle: "preserve-3d",
                    transform: `translateZ(${15 + i * 5}px) rotate(${Math.random() * 45}deg)`,
                  }}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{
                    opacity: animationProgress > 40 + i * 10 ? 0.8 : 0,
                    y: animationProgress > 40 + i * 10 ? 0 : -50,
                  }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                />
              ))}

              {/* Garnish */}
              <motion.div
                className="absolute w-20 h-4 bg-green-500 rounded-full"
                style={{
                  top: "10%",
                  left: "60%",
                  transformStyle: "preserve-3d",
                  transform: "translateZ(20px) rotateZ(-30deg)",
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{
                  opacity: animationProgress > 80 ? 1 : 0,
                  x: animationProgress > 80 ? 0 : 50,
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            {/* Progress indicator */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${animationProgress}%` }}
                />
              </div>
            </div>

            {/* Gesture controls */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800 border-gray-700 text-gray-300"
                onClick={() => handleSwipe("left")}
              >
                <MoveHorizontal className="h-4 w-4 mr-2" /> Swipe
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800 border-gray-700 text-gray-300"
                onClick={() => handleSwipe("up")}
              >
                <RotateCcw className="h-4 w-4 mr-2" /> Tilt
              </Button>
            </div>
          </div>

          {/* Information Panel */}
          <div className="p-6 flex flex-col bg-gray-900">
            <h2 className="text-2xl font-bold text-white mb-2">{drinkName}</h2>
            <div className="mb-6">
              <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                <img
                  src={drinkImage}
                  alt={drinkName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-cyan-400 mb-2">
              Ingredients
            </h3>
            <ul className="space-y-2 mb-6">
              {ingredients.map((ingredient, index) => (
                <motion.li
                  key={index}
                  className="text-gray-300 flex items-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2" />
                  {ingredient}
                </motion.li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold text-cyan-400 mb-2">
              Preparation
            </h3>
            <p className="text-gray-300 mb-6">
              Combine all ingredients except soda water in a shaker with ice.
              Shake well and strain into a chilled glass. Top with soda water
              and garnish with a lime wheel.
            </p>

            <div className="mt-auto flex gap-2">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                Order Ingredients
              </Button>
              <Button
                variant="outline"
                className="border-cyan-600 text-cyan-400 hover:bg-cyan-950"
              >
                Save to Favorites
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DrinkVisualization;
