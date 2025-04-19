
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const UserMenu = () => {
  // Check if user is logged in (has profile image in localStorage)
  const isLoggedIn = localStorage.getItem('profileImage') !== null;
  const profileImage = localStorage.getItem('profileImage');
  const userName = localStorage.getItem('userName') || 'User';

  if (isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 hover:text-white">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profileImage || undefined} />
              <AvatarFallback className="bg-mindful text-white">
                {userName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="hidden lg:inline">{userName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#0c1420] border border-gray-700 text-gray-300">
          <DropdownMenuItem asChild className="hover:bg-gray-800 hover:text-white">
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-gray-800 hover:text-white">
            <Link to="/ai-chat">AI Chat</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            // Simple logout - clear localStorage
            localStorage.removeItem('profileImage');
            localStorage.removeItem('userName');
            window.location.href = '/';
          }} className="hover:bg-gray-800 hover:text-white">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Link to="/login">
        <Button variant="outline" className="border-gray-600 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white">Login</Button>
      </Link>
      <Link to="/signup">
        <Button className="bg-[#ffcc00] hover:bg-[#e6b800] text-[#0c1420] font-medium">CONTACT US</Button>
      </Link>
    </>
  );
};

export default UserMenu;
