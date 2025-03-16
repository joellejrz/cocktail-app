import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Bell, Menu, Settings, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  onMenuToggle?: () => void;
  onSettingsClick?: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
}

const Header = ({
  userName = "Guest User",
  userAvatar = "",
  onMenuToggle = () => {},
  onSettingsClick = () => {},
  onNotificationsClick = () => {},
  onProfileClick = () => {},
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 shadow-md">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-4 text-gray-400 hover:text-aquamarine-400 hover:bg-gray-800"
          onClick={onMenuToggle}
        >
          <Menu size={24} />
        </Button>

        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-silver-400 to-aquamarine-400 bg-clip-text text-transparent">
            AQUAVÉ
          </h1>
          <span className="ml-2 text-xs text-gray-400 uppercase tracking-widest">
            Luxury Experience
          </span>
        </div>
      </div>

      <nav className="hidden md:flex items-center space-x-6">
        <a
          href="#"
          className="text-gray-300 hover:text-aquamarine-400 transition-colors duration-200"
        >
          Discover
        </a>
        <a
          href="#"
          className="text-gray-300 hover:text-aquamarine-400 transition-colors duration-200"
        >
          Collection
        </a>
        <a
          href="#"
          className="text-gray-300 hover:text-aquamarine-400 transition-colors duration-200"
        >
          About
        </a>
      </nav>

      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-aquamarine-400 hover:bg-gray-800"
                onClick={onNotificationsClick}
              >
                <Bell size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-aquamarine-400 hover:bg-gray-800"
                onClick={onSettingsClick}
              >
                <Settings size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div
          className="flex items-center ml-4 cursor-pointer"
          onClick={onProfileClick}
        >
          <Avatar className="h-10 w-10 border border-gray-700 hover:border-aquamarine-400 transition-all duration-200">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-gray-800 text-aquamarine-400">
              {userName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-3 hidden md:block">
            <p className="text-sm font-medium text-gray-200">{userName}</p>
            <p className="text-xs text-gray-400">Premium Member</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
