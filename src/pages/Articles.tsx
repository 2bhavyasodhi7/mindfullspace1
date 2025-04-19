import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: 'The Science of Mindfulness',
      category: 'Mindfulness',
      excerpt: 'Explore the scientific research behind mindfulness and its impact on mental health.',
      image: 'https://images.pexels.com/photos/7605916/pexels-photo-7605916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      author: 'Dr. Emily Carter',
      readTime: 7,
    },
    {
      id: 2,
      title: 'Meditation Techniques for Beginners',
      category: 'Meditation',
      excerpt: 'A step-by-step guide to various meditation techniques to help beginners get started.',
      image: 'https://images.pexels.com/photos/8436587/pexels-photo-8436587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      author: 'Sarah Johnson',
      readTime: 10,
    },
    {
      id: 3,
      title: 'The Benefits of Yoga for Mental Health',
      category: 'Yoga',
      excerpt: 'Learn how yoga can improve your mental well-being and reduce stress.',
      image: 'https://images.pexels.com/photos/5992871/pexels-photo-5992871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      author: 'Michael Davis',
      readTime: 8,
    },
    {
      id: 4,
      title: 'Mindful Eating: Savoring Each Bite',
      category: 'Mindfulness',
      excerpt: 'Discover the practice of mindful eating and how it can transform your relationship with food.',
      image: 'https://images.pexels.com/photos/7890007/pexels-photo-7890007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      author: 'Linda Nguyen',
      readTime: 6,
    },
    {
      id: 5,
      title: 'Creating a Daily Mindfulness Practice',
      category: 'Mindfulness',
      excerpt: 'Practical tips and strategies for incorporating mindfulness into your daily routine.',
      image: 'https://images.pexels.com/photos/13849149/pexels-photo-13849149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      author: 'David Wilson',
      readTime: 9,
    },
    {
      id: 6,
      title: 'The Role of Sleep in Mental Wellness',
      category: 'Wellness',
      excerpt: 'Understand the importance of sleep for mental health and how to improve your sleep habits.',
      image: 'https://images.pexels.com/photos/914910/pexels-photo-914910.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2p',
      author: 'Amanda Brown',
      readTime: 11,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2FCE2] via-white to-[#F2FCE2] py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-black">Mindfulness</span>{' '}
            <span className="text-[#4CAF50]">Articles</span>
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our collection of thoughtfully crafted articles to deepen your understanding of mindfulness practices and their benefits
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link 
              key={article.id} 
              to={`/article/${article.id}`} 
              className="group"
            >
              <div className="bg-white border-2 border-[#4CAF50]/30 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:border-[#4CAF50]/50">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <Badge variant="outline" className="mb-2 text-[#4CAF50] border-[#4CAF50]/30">
                    {article.category}
                  </Badge>
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] to-[#73A580] group-hover:from-[#73A580] group-hover:to-[#4CAF50] transition-all duration-300">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mt-2 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-gray-500">
                    <span>{article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{article.readTime} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
