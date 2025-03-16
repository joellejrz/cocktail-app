import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Music, Lightbulb, Wifi, Palette, Volume2 } from "lucide-react";

interface SmartIntegrationProps {
  selectedMood?: string;
  onLightingChange?: (value: number) => void;
  onMusicVolumeChange?: (value: number) => void;
  onMusicGenreChange?: (genre: string) => void;
  onSmartLightingToggle?: (enabled: boolean) => void;
  onMusicToggle?: (enabled: boolean) => void;
}

const SmartIntegration: React.FC<SmartIntegrationProps> = ({
  selectedMood = "Relaxation",
  onLightingChange = () => {},
  onMusicVolumeChange = () => {},
  onMusicGenreChange = () => {},
  onSmartLightingToggle = () => {},
  onMusicToggle = () => {},
}) => {
  const [lightingIntensity, setLightingIntensity] = useState<number>(70);
  const [musicVolume, setMusicVolume] = useState<number>(50);
  const [smartLightingEnabled, setSmartLightingEnabled] =
    useState<boolean>(true);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(true);

  const moodBasedColors = {
    Relaxation: "bg-blue-900",
    Party: "bg-purple-900",
    "Date Night": "bg-red-900",
    Focus: "bg-green-900",
    Energetic: "bg-orange-900",
  };

  const moodBasedGenres = {
    Relaxation: ["Ambient", "Classical", "Jazz"],
    Party: ["Dance", "Electronic", "Hip-Hop"],
    "Date Night": ["R&B", "Jazz", "Acoustic"],
    Focus: ["Lo-fi", "Classical", "Ambient"],
    Energetic: ["Rock", "Pop", "Electronic"],
  };

  const backgroundColor =
    moodBasedColors[selectedMood as keyof typeof moodBasedColors] ||
    "bg-slate-900";
  const recommendedGenres = moodBasedGenres[
    selectedMood as keyof typeof moodBasedGenres
  ] || ["Jazz", "Pop", "Rock"];

  const handleLightingChange = (value: number[]) => {
    setLightingIntensity(value[0]);
    onLightingChange(value[0]);
  };

  const handleMusicVolumeChange = (value: number[]) => {
    setMusicVolume(value[0]);
    onMusicVolumeChange(value[0]);
  };

  const handleSmartLightingToggle = (checked: boolean) => {
    setSmartLightingEnabled(checked);
    onSmartLightingToggle(checked);
  };

  const handleMusicToggle = (checked: boolean) => {
    setMusicEnabled(checked);
    onMusicToggle(checked);
  };

  const handleGenreSelect = (genre: string) => {
    onMusicGenreChange(genre);
  };

  return (
    <div
      className={`w-full ${backgroundColor} bg-opacity-90 text-white rounded-xl p-6 shadow-lg`}
    >
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Wifi className="mr-2 h-6 w-6 text-aquamarine-400" />
        Smart Integration
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Smart Lighting Control */}
        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-aquamarine-400" />
              Smart Lighting
            </CardTitle>
            <CardDescription className="text-slate-300">
              Adjust lighting to match your {selectedMood} mood
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span>Enable Smart Lighting</span>
              <Switch
                checked={smartLightingEnabled}
                onCheckedChange={handleSmartLightingToggle}
                className="data-[state=checked]:bg-aquamarine-400"
              />
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Intensity</span>
                  <span>{lightingIntensity}%</span>
                </div>
                <Slider
                  defaultValue={[lightingIntensity]}
                  max={100}
                  step={1}
                  onValueChange={handleLightingChange}
                  disabled={!smartLightingEnabled}
                  className="[&>*:nth-child(2)]:bg-aquamarine-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  className="bg-blue-900 hover:bg-blue-800 border-blue-700 text-white"
                  disabled={!smartLightingEnabled}
                >
                  <Palette className="h-4 w-4 mr-2" /> Blue
                </Button>
                <Button
                  variant="outline"
                  className="bg-purple-900 hover:bg-purple-800 border-purple-700 text-white"
                  disabled={!smartLightingEnabled}
                >
                  <Palette className="h-4 w-4 mr-2" /> Purple
                </Button>
                <Button
                  variant="outline"
                  className="bg-red-900 hover:bg-red-800 border-red-700 text-white"
                  disabled={!smartLightingEnabled}
                >
                  <Palette className="h-4 w-4 mr-2" /> Red
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Music Service Integration */}
        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Music className="mr-2 h-5 w-5 text-aquamarine-400" />
              Music Services
            </CardTitle>
            <CardDescription className="text-slate-300">
              Set the perfect soundtrack for your {selectedMood} experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span>Enable Music</span>
              <Switch
                checked={musicEnabled}
                onCheckedChange={handleMusicToggle}
                className="data-[state=checked]:bg-aquamarine-400"
              />
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Volume</span>
                  <span className="flex items-center">
                    <Volume2 className="h-4 w-4 mr-1" />
                    {musicVolume}%
                  </span>
                </div>
                <Slider
                  defaultValue={[musicVolume]}
                  max={100}
                  step={1}
                  onValueChange={handleMusicVolumeChange}
                  disabled={!musicEnabled}
                  className="[&>*:nth-child(2)]:bg-aquamarine-400"
                />
              </div>

              <div>
                <h4 className="mb-2">Recommended Genres</h4>
                <div className="grid grid-cols-3 gap-2">
                  {recommendedGenres.map((genre) => (
                    <Button
                      key={genre}
                      variant="outline"
                      className="bg-slate-700 hover:bg-slate-600 border-slate-600 text-white"
                      onClick={() => handleGenreSelect(genre)}
                      disabled={!musicEnabled}
                    >
                      {genre}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartIntegration;
