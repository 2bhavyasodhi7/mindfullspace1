
import React, { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Headphones, XCircle, Calendar, Clock, Tag, User, ThumbsUp, ThumbsDown, Share } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { defaultControlsSection, defaultProgressBarSection, audioPlayerStyles } from '@/utils/audioPlayerUtils';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  audioUrl: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [article, setArticle] = useState<Article | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [helpfulFeedback, setHelpfulFeedback] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Try to get article from location state or fetch based on ID
    if (location.state?.article) {
      setArticle(location.state.article);
    } else if (id) {
      // In a real app, you'd fetch the article from an API using the ID
      // For demo, we're hardcoding the article data
      const mockArticle = {
        id: '4',
        title: 'Rewire Your Brain: The Power of Neuroplasticity',
        excerpt: 'Discover how you can literally change your brain through focused practice and mindfulness.',
        content: `
          <h1>Rewire Your Brain: The Power of Neuroplasticity</h1>
          
          <p>For much of the 20th century, scientists believed that the adult brain was relatively fixed—its structure and function largely established in childhood. We now know this is far from true. The brain remains malleable throughout life, constantly reorganizing itself based on experiences and focused attention. This property, known as neuroplasticity, offers profound possibilities for personal transformation.</p>
          
          <h2>Understanding Neuroplasticity</h2>
          
          <p>Neuroplasticity refers to the brain's ability to form new neural connections, strengthen existing ones, and even reorganize itself after injury. This happens on multiple levels, from microscopic changes in individual neurons to large-scale changes visible on brain scans.</p>
          
          <p>The saying "neurons that fire together, wire together" (Hebb's rule) captures a fundamental principle of neuroplasticity. When we repeatedly engage in a thought or activity, the neural pathways involved become stronger and more efficient, making that pattern more likely to recur.</p>
          
          <h2>Mindfulness as a Tool for Rewiring</h2>
          
          <p>Mindfulness meditation is one of the most well-researched approaches to intentional brain change. Regular practice has been shown to:</p>
          
          <ul>
            <li>Increase gray matter density in areas associated with attention and emotional regulation</li>
            <li>Reduce activity in the default mode network, which is linked to mind-wandering and rumination</li>
            <li>Strengthen connections between the prefrontal cortex and the amygdala, improving emotional regulation</li>
          </ul>
          
          <p>These changes aren't just theoretical—they translate to measurable improvements in attention, stress management, and emotional wellbeing.</p>
          
          <h2>Daily Practices for Positive Neuroplasticity</h2>
          
          <p>Beyond formal meditation, many daily practices can harness neuroplasticity for positive change:</p>
          
          <h3>Gratitude Practice</h3>
          <p>Regularly focusing on things you're grateful for strengthens neural pathways associated with positive emotions. Even during difficult times, intentionally noticing and appreciating small pleasures can gradually rewire your brain's default response patterns.</p>
          
          <h3>Learning New Skills</h3>
          <p>Novel experiences and challenges create new neural connections. Learning a musical instrument, studying a language, or mastering a craft all provide healthy stimulation for your brain, potentially building cognitive reserve that protects against age-related decline.</p>
          
          <h3>Movement and Exercise</h3>
          <p>Physical activity increases production of brain-derived neurotrophic factor (BDNF), sometimes called "fertilizer for the brain." BDNF supports the growth and maintenance of neurons, facilitating learning and memory formation.</p>
          
          <h2>Overcoming Negative Patterns</h2>
          
          <p>Understanding neuroplasticity also helps explain why negative thought patterns and habits can be so persistent—they've been strengthened through repetition. The good news is that the same principles apply to changing these patterns.</p>
          
          <p>When we notice ourselves engaging in unwanted thought patterns, we can deliberately redirect our attention, gradually weakening those neural pathways while strengthening more helpful alternatives. This process requires patience and consistency but becomes easier with practice.</p>
          
          <h2>The Time Factor</h2>
          
          <p>Significant brain changes don't happen overnight. Research suggests that forming new habits typically takes anywhere from 18 to 254 days, with an average of about 66 days. Creating lasting change requires commitment and consistency.</p>
          
          <p>However, even small daily practices can accumulate into meaningful transformation over time. The key is persistence and self-compassion during the inevitable setbacks that occur along the way.</p>
          
          <h2>Conclusion</h2>
          
          <p>Your brain is constantly being shaped by your experiences and where you direct your attention. By understanding and working with neuroplasticity, you can become an active participant in this process rather than a passive recipient.</p>
          
          <p>Remember that every thought and action is, in a small way, reinforcing neural pathways. Choose wisely what you practice and repeat, knowing that you are literally rewiring your brain with each mindful choice.</p>
        `,
        imageUrl: 'src/pages/images/REWIRE_BRAIN.jpg',
        audioUrl: 'src/pages/audio/neuroplasticity-audio.mp3',
        author: 'Dr. James Wilson',
        date: 'March 18, 2025',
        readTime: '10 min read',
        tags: ['Neuroplasticity', 'Brain Health', 'Science']
      };
      
      setArticle(mockArticle);
    }
    
    // Set up scroll listener for reading progress
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      const scrollPercentage = (currentScroll / totalHeight) * 100;
      setReadProgress(Math.min(scrollPercentage, 100));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id, location]);
  
  if (!article) {
    return (
      <div className="container-custom py-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Loading article...</h2>
          <div className="w-16 h-16 border-4 border-mindful border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }
  
  const provideFeedback = (isHelpful: boolean) => {
    setHelpfulFeedback(isHelpful);
  };
  
  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-mindful-lighter/30 to-white">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Progress value={readProgress} className="h-1 bg-transparent" />
      </div>
      
      {/* Hero section with banner image */}
      <div className="w-full h-64 md:h-80 lg:h-96 relative">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container-custom py-8 text-white">
            {article.tags.map((tag, index) => (
              <Badge key={index} className="bg-mindful mr-2 mb-2">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      {/* Article content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/articles">Articles</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{article.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Back button */}
        <div className="mb-6">
          <Link to="/articles" className="inline-flex items-center text-mindful hover:text-mindful-dark transition-colors">
            <ArrowLeft size={18} className="mr-2" />
            Back to articles
          </Link>
        </div>
        
        {/* Article title and meta */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-raleway mb-4">{article.title}</h1>
          
          <div className="flex flex-wrap gap-4 items-center text-gray-600">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg" alt={article.author} />
                <AvatarFallback>{article.author[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{article.author}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>{article.date}</span>
            </div>
            
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
        
        {/* Audio player */}
        <Card className="mb-8 border-mindful/20 shadow-md">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-mindful">Listen to this article</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1 h-auto"
                onClick={() => setIsAudioPlaying(!isAudioPlaying)}
              >
                {isAudioPlaying ? <XCircle size={16} /> : <Headphones size={16} />}
              </Button>
            </div>
            
            <AudioPlayer
              src={article.audioUrl}
              showJumpControls={true}
              layout="stacked-reverse"
              customControlsSection={defaultControlsSection}
              customProgressBarSection={defaultProgressBarSection}
              className="audio-player-custom rounded-md"
              style={audioPlayerStyles}
              autoPlayAfterSrcChange={false}
              onPlay={() => setIsAudioPlaying(true)}
              onPause={() => setIsAudioPlaying(false)}
            />
          </CardContent>
        </Card>
        
        {/* Article content */}
        <div 
          className="prose prose-lg max-w-none mb-12 font-raleway prose-headings:font-raleway prose-headings:text-mindful-dark prose-a:text-mindful hover:prose-a:text-mindful-dark prose-img:rounded-lg prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* Feedback section */}
        <div className="border-t border-gray-200 pt-8 mt-12">
          <h3 className="text-xl font-semibold mb-4">Was this article helpful?</h3>
          <div className="flex space-x-4">
            <Button 
              variant={helpfulFeedback === true ? "default" : "outline"} 
              onClick={() => provideFeedback(true)}
              className={helpfulFeedback === true ? "bg-mindful hover:bg-mindful-dark" : ""}
            >
              <ThumbsUp size={18} className="mr-2" />
              Yes, it was helpful
            </Button>
            <Button 
              variant={helpfulFeedback === false ? "default" : "outline"}
              onClick={() => provideFeedback(false)}
              className={helpfulFeedback === false ? "bg-mindful hover:bg-mindful-dark" : ""}
            >
              <ThumbsDown size={18} className="mr-2" />
              No, not really
            </Button>
          </div>
        </div>
        
        {/* Share section */}
        <div className="mt-8">
          <Button 
            variant="outline" 
            onClick={shareArticle}
            className="border-mindful/30 text-mindful"
          >
            <Share size={18} className="mr-2" />
            Share this article
          </Button>
        </div>
        
        {/* Related tags */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Related Topics</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <Link to={`/articles?tag=${tag}`} key={index}>
                <Badge variant="outline" className="text-mindful border-mindful/30 hover:bg-mindful/10">
                  <Tag size={14} className="mr-1" />
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
