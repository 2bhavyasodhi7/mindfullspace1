
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Brain, Flower, Clock, BookOpen, Users, Heart, Church, Briefcase, HelpCircle, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const FAQSection = () => {
  const [viewedFAQs, setViewedFAQs] = useState<number[]>([]);
  const [helpfulFeedback, setHelpfulFeedback] = useState<{[key: number]: boolean | null}>({});
  
  const faqs: FAQItem[] = [
    {
      question: "What is mindfulness?",
      answer: "Mindfulness is the practice of being fully present and aware of your thoughts, emotions, and surroundings without judgment.",
      icon: <Brain className="h-6 w-6 text-mindful" />
    },
    {
      question: "How is mindfulness different from meditation?",
      answer: "Meditation is a structured practice, while mindfulness can be practiced anytime in daily life by staying aware and present in the moment.",
      icon: <Flower className="h-6 w-6 text-mindful" />
    },
    {
      question: "What are the benefits of mindfulness?",
      answer: "Mindfulness can reduce stress, improve focus, enhance emotional regulation, boost creativity, and promote overall well-being.",
      icon: <Heart className="h-6 w-6 text-mindful" />
    },
    {
      question: "How do I start practicing mindfulness?",
      answer: "Begin with simple exercises like mindful breathing, body scans, or focusing on your senses while doing daily activities.",
      icon: <Clock className="h-6 w-6 text-mindful" />
    },
    {
      question: "How long should I practice mindfulness each day?",
      answer: "Even 5–10 minutes a day can be beneficial, but longer practices (20–30 minutes) can deepen the effects.",
      icon: <Clock className="h-6 w-6 text-mindful" />
    },
    {
      question: "Can mindfulness help with anxiety and depression?",
      answer: "Yes, mindfulness can help manage anxiety and depression by reducing overthinking and promoting emotional balance.",
      icon: <Brain className="h-6 w-6 text-mindful" />
    },
    {
      question: "Is mindfulness a religious practice?",
      answer: "While mindfulness has roots in Buddhism, it is a secular practice that anyone can use, regardless of religious beliefs.",
      icon: <Church className="h-6 w-6 text-mindful" />
    },
    {
      question: "Can I practice mindfulness while working or studying?",
      answer: "Yes, you can be mindful by focusing on one task at a time, taking deep breaths, and reducing distractions.",
      icon: <Briefcase className="h-6 w-6 text-mindful" />
    },
    {
      question: "What are some common obstacles in mindfulness practice?",
      answer: "Common challenges include a wandering mind, impatience, expecting immediate results, and difficulty staying consistent.",
      icon: <HelpCircle className="h-6 w-6 text-mindful" />
    },
    {
      question: "How do I know if mindfulness is working for me?",
      answer: "You may notice increased self-awareness, reduced stress, better concentration, and improved emotional responses over time.",
      icon: <CheckCircle className="h-6 w-6 text-mindful" />
    }
  ];
  
  const handleAccordionChange = (value: string) => {
    if (value) {
      const index = parseInt(value.replace('item-', ''));
      if (!viewedFAQs.includes(index)) {
        setViewedFAQs([...viewedFAQs, index]);
      }
    }
  };
  
  const provideFeedback = (index: number, isHelpful: boolean) => {
    setHelpfulFeedback(prev => ({
      ...prev,
      [index]: isHelpful
    }));
  };
  
  const progressPercentage = (viewedFAQs.length / faqs.length) * 100;
  
  return (
    <section className="bg-gradient-to-br from-mindful-lighter/50 to-white dark:bg-gray-900 relative" id="faq">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-center mindful-heading mb-2">
            Frequently Asked <span className="bg-gradient-to-r from-mindful to-amber-500 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover answers to common questions about mindfulness and meditation practice.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mt-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {viewedFAQs.length}/{faqs.length} FAQs explored
              </span>
              <span className="text-sm font-medium text-mindful">
                {progressPercentage.toFixed(0)}%
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-gray-200 dark:bg-gray-700" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] border border-amber-400/30 hover:shadow-[0_0_15px_rgba(255,191,0,0.3)] overflow-hidden"
              >
                <Accordion 
                  type="single" 
                  collapsible 
                  onValueChange={(value) => handleAccordionChange(value)}
                  className="border-none"
                >
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="px-5 py-4 flex items-center font-serif text-lg font-medium hover:no-underline bg-gradient-to-r hover:from-mindful-lighter hover:to-amber-100/50">
                      <div className="flex items-center">
                        <span className="mr-3">{faq.icon}</span>
                        <span className="bg-gradient-to-r from-mindful-dark to-amber-700 bg-clip-text text-transparent">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5 font-sans text-base leading-relaxed text-gray-600 dark:text-gray-300 animate-accordion-down">
                      <p className="mb-4">{faq.answer}</p>
                      
                      <div className="mt-4 flex items-center justify-end">
                        <span className="text-xs text-gray-500 mr-2">Was this helpful?</span>
                        <button 
                          onClick={() => provideFeedback(index, true)}
                          className={`p-1 rounded-full mr-1 ${helpfulFeedback[index] === true ? 'bg-mindful/20 text-mindful' : 'text-gray-400 hover:text-mindful'}`}
                          aria-label="This was helpful"
                        >
                          👍
                        </button>
                        <button 
                          onClick={() => provideFeedback(index, false)}
                          className={`p-1 rounded-full ${helpfulFeedback[index] === false ? 'bg-mindful/20 text-mindful' : 'text-gray-400 hover:text-mindful'}`}
                          aria-label="This was not helpful"
                        >
                          👎
                        </button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mx-auto border border-amber-400/30">
            <p className="text-lg font-serif italic mb-2 bg-gradient-to-r from-mindful-dark to-amber-700 bg-clip-text text-transparent">
              "72% of users reported feeling calmer after just 2 weeks of regular practice"
            </p>
            <p className="text-sm text-gray-500">
              — Based on user surveys from 2024
            </p>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="/meditation" 
          className="bg-gradient-to-r from-mindful to-amber-500 hover:from-mindful-dark hover:to-amber-600 text-white rounded-full px-6 py-3 shadow-lg flex items-center transition-all duration-300 hover:scale-105"
        >
          <Flower className="mr-2 h-5 w-5" />
          Start Practicing
        </a>
      </div>
    </section>
  );
};

export default FAQSection;
