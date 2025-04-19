
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, Bot } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface ResourcesMenuProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

const ResourcesMenu: React.FC<ResourcesMenuProps> = ({ mobile, onItemClick }) => {
  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-sm font-medium text-white hover:bg-white/10 hover:text-green-300"
        >
          <BookOpen size={18} />
          <span className="ml-1">Resources</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className={`bg-white/10 backdrop-blur-lg border border-white/20 text-white ${mobile ? 'w-full' : 'min-w-[200px]'}`}
      >
        <DropdownMenuItem asChild>
          <Link 
            to="/articles" 
            className="hover:bg-green-800/30 hover:text-white w-full"
            onClick={handleItemClick}
          >
            Articles
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            to="/meditation" 
            className="hover:bg-green-800/30 hover:text-white w-full"
            onClick={handleItemClick}
          >
            Meditation
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            to="/yoga" 
            className="hover:bg-green-800/30 hover:text-white w-full"
            onClick={handleItemClick}
          >
            Yoga
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            to="/sleep" 
            className="hover:bg-green-800/30 hover:text-white w-full"
            onClick={handleItemClick}
          >
            Sleep
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            to="/stress-and-anxiety" 
            className="hover:bg-green-800/30 hover:text-white w-full"
            onClick={handleItemClick}
          >
            Stress & Anxiety
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            to="/journaling" 
            className="hover:bg-green-800/30 hover:text-white w-full"
            onClick={handleItemClick}
          >
            Journaling
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            to="/ai-chat" 
            className="hover:bg-green-800/30 hover:text-white w-full flex items-center gap-1.5"
            onClick={handleItemClick}
          >
            <Bot size={16} className="text-gold" />
            <span>MindfulChat</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ResourcesMenu;
