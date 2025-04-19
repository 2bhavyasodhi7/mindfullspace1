import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Mic, Bot, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex space-x-1 items-center p-2">
    <div className="w-2 h-2 rounded-full bg-mindful animate-pulse"></div>
    <div className="w-2 h-2 rounded-full bg-mindful animate-pulse delay-75"></div>
    <div className="w-2 h-2 rounded-full bg-mindful animate-pulse delay-150"></div>
  </div>
);

// Quick reply button component
const QuickReplyButton = ({ text, onClick }: { text: string; onClick: () => void }) => (
  <button 
    className="bg-gray-800 text-white border-none rounded-[18px] px-[18px] py-2 text-base font-normal cursor-pointer shadow-md transition-all hover:bg-gray-700"
    onClick={onClick}
  >
    {text}
  </button>
);

const AIChat = () => {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! 🌱 I\'m here to help you find calm. How are you feeling today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Updated to use Gemini API 
  const generateResponse = async (prompt: string) => {
  try {
    const API_KEY = "AIzaSyALXZHcvALcuNBcSG6AJjAsApqUkj5k9Ro";
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    
    // Special handling for breathing exercise
    if (prompt.toLowerCase().includes('breathing exercise')) {
      return `🌿 **4-7-8 Breathing Meditation**

*A gentle journey to inner calm*

1. 🧘‍♀️ **Sit Comfortably**
   • Find a peaceful spot
   • Relax your shoulders
   • Soften your jaw

2. 🫁 **Exhale Completely**
   • Release all the air from your lungs
   • Let go of tension

3. 🌬️ **Inhale (4 counts)**
   • Breathe deeply through your nose
   • Feel your belly expand
   • Allow peace to enter

4. 🕊️ **Hold (7 counts)**
   • Pause gently
   • Notice the stillness
   • Feel centered

5. 🌊 **Exhale (8 counts)**
   • Slowly breathe out through your mouth
   • Make a soft "whoosh" sound
   • Release all stress

**Repeat 3-4 times**

💫 *After each cycle, notice how you feel*
Observe without judgment. You're cultivating inner peace.`;
    }

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { 
                text: `You are a mindfulness assistant named MindfulBot. Respond to the following with practical mindfulness advice. Keep responses concise and actionable: ${prompt}` 
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      }),
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      console.error('API Error:', data.error);
      return `I'm sorry, I encountered an error: ${data.error.message || 'Unknown error'}. Please try again later.`;
    } else {
      console.error('Unexpected API response structure:', data);
      return "I'm sorry, I couldn't generate a response at the moment. Please try again later.";
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return "I'm sorry, I encountered an error. Please try again later.";
  }
};

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);
    setShowQuickReplies(false);
    
    try {
      // Get response from API
      const botResponse = await generateResponse(input);
      
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      
      // Show quick replies after bot responds
      setShowQuickReplies(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from the AI. Please try again.",
        variant: "destructive"
      });
      console.error('Error in chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    setTimeout(handleSendMessage, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Input",
      description: "Voice input functionality will be available soon.",
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px-64px)] bg-gradient-to-br from-green-dark to-green-light flex items-center justify-center relative overflow-hidden">
      {/* Organic Circles */}
      <div className="absolute w-[400px] h-[400px] left-[-100px] top-[-80px] rounded-full opacity-18 pointer-events-none z-1 bg-gold/20 animate-float1"></div>
      <div className="absolute w-[300px] h-[300px] right-[-80px] top-[120px] rounded-full opacity-18 pointer-events-none z-1 bg-green-light/20 animate-float2"></div>
      <div className="absolute w-[200px] h-[200px] left-[60%] bottom-[-60px] rounded-full opacity-18 pointer-events-none z-1 bg-green-dark/20 animate-float3"></div>
      
      {/* Chatbot Container */}
      <div className="relative z-2 w-full max-w-[420px] min-h-[600px] bg-white/70 rounded-[32px] shadow-lg flex flex-col overflow-hidden my-8 mx-4">
        {/* Header */}
        <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-green-dark to-green-light rounded-t-[32px] shadow-sm">
          <div className="w-14 h-14 rounded-full border-3 border-gold overflow-hidden shadow-sm bg-white flex items-center justify-center">
            <Avatar className="w-full h-full">
              <AvatarFallback className="bg-mindful-dark text-white">
                <Bot className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div className="text-xl font-bold text-white tracking-wide">MindfulBot</div>
            <div className="text-sm font-semibold text-gold mt-0.5">Online</div>
          </div>
        </div>
        
        {/* Chat Area */}
        <div 
          ref={chatContainerRef}
          className="flex-1 p-6 overflow-y-auto bg-transparent flex flex-col gap-4 scrollbar-thin scrollbar-track-green-light scrollbar-thumb-gold"
        >
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`max-w-[80%] p-4 rounded-[22px] shadow-sm text-base leading-relaxed relative mb-0.5 animate-fadeInUp transition-colors ${
                message.sender === 'user' 
                  ? 'bg-[#eaf7f0] text-green-dark self-end rounded-br-[8px] border-1.5 border-green-light' 
                  : 'bg-white text-green-dark self-start rounded-bl-[8px] border-1.5 border-gold'
              }`}
            >
              <span className="block">{message.content}</span>
              <span className="block text-sm text-[#7a8c7a] mt-1.5 opacity-70 text-right">
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
          ))}
          
          {isLoading && (
            <div className="max-w-[80%] p-4 rounded-[22px] shadow-sm text-base leading-relaxed relative mb-0.5 bg-white text-green-dark self-start rounded-bl-[8px] border-1.5 border-gold">
              <TypingIndicator />
            </div>
          )}
          
          {/* Quick Replies */}
          {showQuickReplies && !isLoading && messages.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-2">
              <QuickReplyButton 
                text="Breathing Exercise" 
                onClick={() => handleQuickReply("Guide me through a breathing exercise")} 
              />
              <QuickReplyButton 
                text="Help With Anxiety" 
                onClick={() => handleQuickReply("I'm feeling anxious, what can I do?")} 
              />
              <QuickReplyButton 
                text="Mindful Quote" 
                onClick={() => handleQuickReply("Share a mindful quote for today")} 
              />
            </div>
          )}
        </div>
        
        {/* Input Bar */}
        <div className="flex items-center p-4 border-t-[1.5px] border-gold bg-white/45 backdrop-blur-md rounded-b-[32px] shadow-sm relative z-2">
          <Input
            placeholder="Type your thoughts…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 border-none bg-transparent text-base text-green-dark py-2 outline-none font-[Nunito,Arial,sans-serif] placeholder:text-[#7a8c7a] placeholder:opacity-70 placeholder:italic focus-visible:ring-0"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-gold border-none rounded-full w-10 h-10 ml-3 flex items-center justify-center cursor-pointer shadow-sm hover:bg-green-light transition-colors"
            disabled={input.trim() === '' || isLoading}
            size="icon"
          >
            <Send className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <Button
        onClick={handleVoiceInput}
        className="fixed bottom-9 right-9 w-14 h-14 bg-gold border-none rounded-full shadow-lg flex items-center justify-center cursor-pointer z-10 hover:bg-green-light transition-colors"
        size="icon"
      >
        <Mic className="h-6 w-6 text-white" />
      </Button>
      
      <style>
        {`
          @keyframes float1 { to { top: -60px; left: -80px; } }
          @keyframes float2 { to { top: 140px; right: -60px; } }
          @keyframes float3 { to { bottom: -40px; left: 62%; } }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default AIChat;
