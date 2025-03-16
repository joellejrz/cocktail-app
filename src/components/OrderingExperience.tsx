import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  CreditCard,
  Package,
  Check,
  Wine,
  Truck,
} from "lucide-react";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface OrderingExperienceProps {
  selectedDrink?: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  onOrderComplete?: () => void;
}

const OrderingExperience = ({
  selectedDrink = {
    id: "1",
    name: "Aquamarine Bliss",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1560963689-b5682b6440f8?w=800&q=80",
    description:
      "A premium cocktail with hints of elderflower and citrus, perfectly balanced with top-shelf vodka.",
  },
  onOrderComplete = () => {},
}: OrderingExperienceProps) => {
  const [orderStep, setOrderStep] = useState<number>(1);
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);

  const premiumBrands = [
    { id: "1", name: "Grey Goose", price: 59.99 },
    { id: "2", name: "Belvedere", price: 54.99 },
    { id: "3", name: "Ciroc", price: 49.99 },
    { id: "4", name: "Ketel One", price: 39.99 },
  ];

  const handleNextStep = () => {
    if (orderStep < 3) {
      setOrderStep(orderStep + 1);
    } else {
      setIsOrderPlaced(true);
      setTimeout(() => {
        setIsDialogOpen(false);
        onOrderComplete();
      }, 3000);
    }
  };

  const handlePrevStep = () => {
    if (orderStep > 1) {
      setOrderStep(orderStep - 1);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-200">
          Premium Ordering Experience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Selected Drink */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedDrink.image}
                  alt={selectedDrink.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Premium Selection
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-cyan-400">
                  {selectedDrink.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {selectedDrink.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white">
                    ${selectedDrink.price.toFixed(2)}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray-400 text-sm ml-1">
                      (42 reviews)
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-700 bg-gray-800/50">
                <div className="w-full">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">
                    Perfect Pairings
                  </h3>
                  <div className="flex space-x-2">
                    {["Citrus Garnish", "Premium Tonic", "Elderflower"].map(
                      (item, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs"
                        >
                          {item}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Right side - Order Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-400">
                  Complete Your Experience
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Select premium spirits and customize your order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">
                    Select Premium Spirit
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {premiumBrands.map((brand) => (
                      <div
                        key={brand.id}
                        className="border border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{brand.name}</span>
                          <span className="text-cyan-400">${brand.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">
                    Delivery Options
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <Truck className="w-5 h-5 mr-2 text-cyan-400" />
                        <span>Standard Delivery</span>
                      </div>
                      <span>Free</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg bg-gray-700/30">
                      <div className="flex items-center">
                        <Package className="w-5 h-5 mr-2 text-cyan-400" />
                        <span>Express Delivery</span>
                      </div>
                      <span>$12.99</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4 border-t border-gray-700 pt-6">
                <div className="flex justify-between w-full text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-cyan-400">
                    ${(selectedDrink.price + 54.99).toFixed(2)}
                  </span>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-600 hover:to-teal-500 text-white">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-800 border-gray-700 text-white">
                    {isOrderPlaced ? (
                      <motion.div
                        className="py-8 flex flex-col items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                          <Check className="w-8 h-8 text-green-500" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">
                          Order Confirmed!
                        </h2>
                        <p className="text-gray-400 text-center mb-4">
                          Your premium spirits will be delivered soon. We've
                          sent the details to your email.
                        </p>
                        <div className="w-full max-w-md p-4 border border-gray-700 rounded-lg bg-gray-800/50">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-400">Order #</span>
                            <span>
                              AQV-{Math.floor(100000 + Math.random() * 900000)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Estimated Delivery
                            </span>
                            <span>Within 24 hours</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <>
                        <DialogHeader>
                          <DialogTitle className="text-xl text-cyan-400">
                            {orderStep === 1
                              ? "Shipping Information"
                              : orderStep === 2
                                ? "Payment Details"
                                : "Confirm Order"}
                          </DialogTitle>
                          <DialogDescription className="text-gray-400">
                            {orderStep === 1
                              ? "Enter your delivery address"
                              : orderStep === 2
                                ? "Secure payment information"
                                : "Review your order details"}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="py-4">
                          {orderStep === 1 && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm text-gray-400 mb-1 block">
                                    First Name
                                  </label>
                                  <Input
                                    className="bg-gray-700 border-gray-600"
                                    placeholder="John"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm text-gray-400 mb-1 block">
                                    Last Name
                                  </label>
                                  <Input
                                    className="bg-gray-700 border-gray-600"
                                    placeholder="Doe"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-sm text-gray-400 mb-1 block">
                                  Address
                                </label>
                                <Input
                                  className="bg-gray-700 border-gray-600"
                                  placeholder="123 Luxury Ave"
                                />
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <label className="text-sm text-gray-400 mb-1 block">
                                    City
                                  </label>
                                  <Input
                                    className="bg-gray-700 border-gray-600"
                                    placeholder="New York"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm text-gray-400 mb-1 block">
                                    State
                                  </label>
                                  <Select>
                                    <SelectTrigger className="bg-gray-700 border-gray-600">
                                      <SelectValue placeholder="State" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-700 border-gray-600">
                                      <SelectItem value="ny">
                                        New York
                                      </SelectItem>
                                      <SelectItem value="ca">
                                        California
                                      </SelectItem>
                                      <SelectItem value="tx">Texas</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm text-gray-400 mb-1 block">
                                    ZIP
                                  </label>
                                  <Input
                                    className="bg-gray-700 border-gray-600"
                                    placeholder="10001"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {orderStep === 2 && (
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm text-gray-400 mb-1 block">
                                  Card Number
                                </label>
                                <div className="relative">
                                  <Input
                                    className="bg-gray-700 border-gray-600 pl-10"
                                    placeholder="4242 4242 4242 4242"
                                  />
                                  <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm text-gray-400 mb-1 block">
                                    Expiration Date
                                  </label>
                                  <Input
                                    className="bg-gray-700 border-gray-600"
                                    placeholder="MM/YY"
                                  />
                                </div>
                                <div>
                                  <label className="text-sm text-gray-400 mb-1 block">
                                    CVC
                                  </label>
                                  <Input
                                    className="bg-gray-700 border-gray-600"
                                    placeholder="123"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-sm text-gray-400 mb-1 block">
                                  Name on Card
                                </label>
                                <Input
                                  className="bg-gray-700 border-gray-600"
                                  placeholder="John Doe"
                                />
                              </div>
                            </div>
                          )}

                          {orderStep === 3 && (
                            <div className="space-y-4">
                              <div className="bg-gray-700/30 p-4 rounded-lg">
                                <h3 className="font-medium mb-2 flex items-center">
                                  <Wine className="w-4 h-4 mr-2 text-cyan-400" />
                                  Order Summary
                                </h3>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">
                                      {selectedDrink.name}
                                    </span>
                                    <span>
                                      ${selectedDrink.price.toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">
                                      Belvedere Premium Vodka
                                    </span>
                                    <span>$54.99</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">
                                      Express Delivery
                                    </span>
                                    <span>$12.99</span>
                                  </div>
                                  <div className="border-t border-gray-600 my-2 pt-2 flex justify-between font-medium">
                                    <span>Total</span>
                                    <span className="text-cyan-400">
                                      $
                                      {(
                                        selectedDrink.price +
                                        54.99 +
                                        12.99
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-700/30 p-4 rounded-lg">
                                <h3 className="font-medium mb-2">
                                  Shipping Address
                                </h3>
                                <p className="text-sm text-gray-400">
                                  John Doe
                                  <br />
                                  123 Luxury Ave
                                  <br />
                                  New York, NY 10001
                                </p>
                              </div>
                              <div className="bg-gray-700/30 p-4 rounded-lg">
                                <h3 className="font-medium mb-2">
                                  Payment Method
                                </h3>
                                <div className="flex items-center">
                                  <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                                  <span className="text-sm text-gray-400">
                                    Visa ending in 4242
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <DialogFooter className="flex sm:justify-between">
                          {orderStep > 1 && (
                            <Button
                              variant="outline"
                              onClick={handlePrevStep}
                              className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            >
                              Back
                            </Button>
                          )}
                          <Button
                            onClick={handleNextStep}
                            className="bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-600 hover:to-teal-500 text-white"
                          >
                            {orderStep < 3 ? "Continue" : "Place Order"}
                          </Button>
                        </DialogFooter>
                      </>
                    )}
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderingExperience;
