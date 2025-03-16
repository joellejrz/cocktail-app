import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { motion } from "framer-motion";
import { GlassWater, Heart, Share2, ShoppingCart } from "lucide-react";

interface DrinkCardProps {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  ingredients?: string[];
  price?: number;
  alcoholContent?: number;
  isFavorite?: boolean;
  onSelect?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onToggleFavorite?: (id: string, isFavorite: boolean) => void;
  onShare?: (id: string) => void;
}

const DrinkCard = ({
  id = "drink-1",
  name = "Aquamarine Serenity",
  description = "A refreshing blend of premium gin, blue curaçao, and elderflower tonic that captures the essence of tranquility.",
  image = "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80",
  ingredients = [
    "Premium Gin",
    "Blue Curaçao",
    "Elderflower Tonic",
    "Lime",
    "Mint",
  ],
  price = 18.99,
  alcoholContent = 12,
  isFavorite = false,
  onSelect = () => {},
  onAddToCart = () => {},
  onToggleFavorite = () => {},
  onShare = () => {},
}: DrinkCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden flex flex-col bg-gray-900 border-gray-800 text-white">
        <div className="relative overflow-hidden h-48">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-2 right-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onToggleFavorite(id, !isFavorite)}
              className="bg-black/50 p-2 rounded-full"
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`}
              />
            </motion.button>
          </div>
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-cyan-600 hover:bg-cyan-700">
              <GlassWater className="h-3 w-3 mr-1" />
              {alcoholContent}% ABV
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-cyan-400">
            {name}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-2 flex-grow">
          <div className="flex flex-wrap gap-1 mb-3">
            {ingredients.map((ingredient, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs border-gray-700 text-gray-300"
              >
                {ingredient}
              </Badge>
            ))}
          </div>
          <p className="text-xl font-bold text-cyan-300">${price.toFixed(2)}</p>
        </CardContent>

        <CardFooter className="flex justify-between gap-2 pt-0">
          <Button
            variant="default"
            className="flex-1 bg-cyan-700 hover:bg-cyan-600"
            onClick={() => onSelect(id)}
          >
            View Details
          </Button>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={() => onShare(id)}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={() => onAddToCart(id)}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DrinkCard;
