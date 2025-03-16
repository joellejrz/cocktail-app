import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import MoodSelectionInterface from "./MoodSelectionInterface";
import DrinkRecommendations from "./DrinkRecommendations";
import SmartIntegration from "./SmartIntegration";
import OrderingExperience from "./OrderingExperience";

interface MoodOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
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

const Home = () => {
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [showRecommendations, setShowRecommendations] =
    useState<boolean>(false);
  const [showSmartIntegration, setShowSmartIntegration] =
    useState<boolean>(false);
  const [showOrderingExperience, setShowOrderingExperience] =
    useState<boolean>(false);

  const handleMoodSelect = (mood: MoodOption) => {
    setSelectedMood(mood);
    setShowRecommendations(true);
    setShowSmartIntegration(true);
    // Scroll to recommendations section
    setTimeout(() => {
      document
        .getElementById("recommendations")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDrinkSelect = (drinkId: string) => {
    // Find the selected drink from recommendations
    const drink = mockRecommendations.find((d) => d.id === drinkId);
    if (drink) {
      setSelectedDrink(drink);
      setShowOrderingExperience(true);
      // Scroll to ordering experience section
      setTimeout(() => {
        document
          .getElementById("ordering")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleOrderComplete = () => {
    // Reset the flow or show a success message
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Mock recommendations data
  const mockRecommendations: Drink[] = [
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
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header
        userName="Luxury User"
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=luxury"
      />

      <main className="container mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <motion.section
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-200">
            AQUAVÉ
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Experience luxury drinks tailored to your mood through AI-powered
            recommendations
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-teal-400 mx-auto mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select your mood below and let our advanced AI create the perfect
            drink experience for you, complete with ambiance settings and
            premium ordering options.
          </p>
        </motion.section>

        {/* Mood Selection Section */}
        <section className="py-8">
          <MoodSelectionInterface
            onMoodSelect={handleMoodSelect}
            selectedMood={selectedMood?.id}
          />
        </section>

        {/* Recommendations Section */}
        {showRecommendations && selectedMood && (
          <motion.section
            id="recommendations"
            className="py-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DrinkRecommendations
              selectedMood={selectedMood.name}
              recommendations={mockRecommendations}
              onSelectDrink={handleDrinkSelect}
            />
          </motion.section>
        )}

        {/* Smart Integration Section */}
        {showSmartIntegration && selectedMood && (
          <motion.section
            className="py-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SmartIntegration selectedMood={selectedMood.name} />
          </motion.section>
        )}

        {/* Ordering Experience Section */}
        {showOrderingExperience && selectedDrink && (
          <motion.section
            id="ordering"
            className="py-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <OrderingExperience
              selectedDrink={{
                id: selectedDrink.id,
                name: selectedDrink.name,
                price: selectedDrink.price,
                image: selectedDrink.image,
                description: selectedDrink.description,
              }}
              onOrderComplete={handleOrderComplete}
            />
          </motion.section>
        )}

        {/* Footer Section */}
        <footer className="py-12 border-t border-gray-800 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">AQUAVÉ</h3>
              <p className="text-gray-400">
                Luxury AI-powered drink experiences tailored to your mood and
                preferences.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">
                Quick Links
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Premium Membership
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Partner Brands
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">
                Connect
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} AQUAVÉ. All rights reserved.</p>
            <p className="mt-2">
              <a href="#" className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </a>{" "}
              |
              <a
                href="#"
                className="hover:text-cyan-400 transition-colors ml-2"
              >
                Terms of Service
              </a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
