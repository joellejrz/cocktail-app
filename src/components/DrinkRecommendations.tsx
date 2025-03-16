import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import DrinkCard from "./DrinkCard";
import DrinkVisualization from "./DrinkVisualization";

interface DrinkRecommendationsProps {
  selectedMood?: string;
  recommendations?: Drink[];
  onSelectDrink?: (drinkId: string) => void;
}

interface Drink {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients: string[];
  price: number;
  alcoholContent: number;
  isFavorite: boolean;
  category: string;
}

const DrinkRecommendations = ({
  selectedMood = "Relaxation",
  recommendations = [
    {
      id: "drink-1",
      name: "Aquamarine Serenity",
      description:
        "A refreshing blend of premium gin, blue curaçao, and elderflower tonic that captures the essence of tranquility.",
      image:
        "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80",
      ingredients: [
        "Premium Gin",
        "Blue Curaçao",
        "Elderflower Tonic",
        "Lime",
        "Mint",
      ],
      price: 18.99,
      alcoholContent: 12,
      isFavorite: false,
      category: "Signature",
    },
    {
      id: "drink-2",
      name: "Midnight Velvet",
      description:
        "A sophisticated cocktail with aged bourbon, blackberry liqueur, and a hint of vanilla, perfect for unwinding.",
      image:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80",
      ingredients: [
        "Aged Bourbon",
        "Blackberry Liqueur",
        "Vanilla Syrup",
        "Angostura Bitters",
        "Orange Peel",
      ],
      price: 21.99,
      alcoholContent: 18,
      isFavorite: true,
      category: "Classic",
    },
    {
      id: "drink-3",
      name: "Azure Dream",
      description:
        "A delicate blend of premium vodka, blue curaçao, and coconut cream, topped with edible silver flakes.",
      image:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80",
      ingredients: [
        "Premium Vodka",
        "Blue Curaçao",
        "Coconut Cream",
        "Pineapple Juice",
        "Edible Silver",
      ],
      price: 23.99,
      alcoholContent: 14,
      isFavorite: false,
      category: "Signature",
    },
    {
      id: "drink-4",
      name: "Emerald Elixir",
      description:
        "A vibrant mix of white rum, matcha, lime, and mint that energizes while maintaining sophistication.",
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80",
      ingredients: [
        "White Rum",
        "Matcha Powder",
        "Fresh Lime Juice",
        "Mint Leaves",
        "Simple Syrup",
      ],
      price: 19.99,
      alcoholContent: 10,
      isFavorite: false,
      category: "Trending",
    },
    {
      id: "drink-5",
      name: "Silver Moonlight",
      description:
        "A luxurious combination of silver tequila, elderflower liqueur, and grapefruit, with a silver-dusted rim.",
      image:
        "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=400&q=80",
      ingredients: [
        "Silver Tequila",
        "Elderflower Liqueur",
        "Grapefruit Juice",
        "Lime",
        "Silver Dust",
      ],
      price: 22.99,
      alcoholContent: 16,
      isFavorite: true,
      category: "Premium",
    },
    {
      id: "drink-6",
      name: "Celestial Fizz",
      description:
        "A sparkling concoction of gin, prosecco, and butterfly pea flower tea that changes color as you drink.",
      image:
        "https://images.unsplash.com/photo-1527761939622-933c62e8c4c3?w=400&q=80",
      ingredients: [
        "Gin",
        "Prosecco",
        "Butterfly Pea Flower Tea",
        "Lemon Juice",
        "Simple Syrup",
      ],
      price: 20.99,
      alcoholContent: 13,
      isFavorite: false,
      category: "Trending",
    },
  ],
  onSelectDrink = () => {},
}: DrinkRecommendationsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [showVisualization, setShowVisualization] = useState(false);

  const itemsPerPage = 3;

  // Filter drinks based on search term and active category
  const filteredDrinks = recommendations.filter((drink) => {
    const matchesSearch =
      drink.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drink.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || drink.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort drinks based on selected sort option
  const sortedDrinks = [...filteredDrinks].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "alcohol-low") return a.alcoholContent - b.alcoholContent;
    if (sortBy === "alcohol-high") return b.alcoholContent - a.alcoholContent;
    return 0; // Default: recommended order
  });

  // Paginate drinks
  const totalPages = Math.ceil(sortedDrinks.length / itemsPerPage);
  const displayedDrinks = sortedDrinks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDrinkSelect = (id: string) => {
    const drink = recommendations.find((d) => d.id === id);
    if (drink) {
      setSelectedDrink(drink);
      setShowVisualization(true);
      onSelectDrink(id);
    }
  };

  const handleAddToCart = (id: string) => {
    console.log(`Added drink ${id} to cart`);
  };

  const handleToggleFavorite = (id: string, isFavorite: boolean) => {
    console.log(`Toggled favorite for drink ${id}: ${isFavorite}`);
  };

  const handleShare = (id: string) => {
    console.log(`Shared drink ${id}`);
  };

  return (
    <div className="w-full bg-gray-950 text-white p-6 rounded-xl border border-gray-800">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">
          {selectedMood} Recommendations
        </h2>
        <p className="text-gray-400">
          AI-curated drinks to match your {selectedMood.toLowerCase()} mood,
          personalized just for you.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search drinks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-700 text-white"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700 text-white">
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="alcohol-low">Alcohol: Low to High</SelectItem>
              <SelectItem value="alcohol-high">Alcohol: High to Low</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-gray-700 text-white">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs
        defaultValue="all"
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="mb-6"
      >
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-cyan-900 data-[state=active]:text-white"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="Signature"
            className="data-[state=active]:bg-cyan-900 data-[state=active]:text-white"
          >
            Signature
          </TabsTrigger>
          <TabsTrigger
            value="Classic"
            className="data-[state=active]:bg-cyan-900 data-[state=active]:text-white"
          >
            Classic
          </TabsTrigger>
          <TabsTrigger
            value="Trending"
            className="data-[state=active]:bg-cyan-900 data-[state=active]:text-white"
          >
            Trending
          </TabsTrigger>
          <TabsTrigger
            value="Premium"
            className="data-[state=active]:bg-cyan-900 data-[state=active]:text-white"
          >
            Premium
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Drink Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <AnimatePresence mode="wait">
          {displayedDrinks.length > 0 ? (
            displayedDrinks.map((drink) => (
              <motion.div
                key={drink.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DrinkCard
                  id={drink.id}
                  name={drink.name}
                  description={drink.description}
                  image={drink.image}
                  ingredients={drink.ingredients}
                  price={drink.price}
                  alcoholContent={drink.alcoholContent}
                  isFavorite={drink.isFavorite}
                  onSelect={handleDrinkSelect}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  onShare={handleShare}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-400 text-lg">
                No drinks match your search criteria.
              </p>
              <Button
                variant="link"
                className="text-cyan-400 mt-2"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border-gray-700 text-white hover:bg-gray-800 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="border-gray-700 text-white hover:bg-gray-800 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Drink Visualization Modal */}
      {showVisualization && selectedDrink && (
        <DrinkVisualization
          drinkName={selectedDrink.name}
          drinkImage={selectedDrink.image}
          ingredients={selectedDrink.ingredients.map((ing) => `${ing}`)}
          isVisible={showVisualization}
          onClose={() => setShowVisualization(false)}
        />
      )}
    </div>
  );
};

export default DrinkRecommendations;
