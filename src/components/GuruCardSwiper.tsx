
import React from 'react';
import { CardCarousel } from '@/components/ui/card-carousel';

const GuruCardSwiper = () => {
  const gurus = [
    {
      image: "/images/sadhguru.jpg",
      title: "Sadhguru",
      description: "Jagadish \"Jaggi\" Vasudev, known as Sadhguru, is an Indian yoga guru and author. Founder of the Isha Foundation, he teaches yoga and offers spiritual wisdom worldwide."
    },
    {
      image: "/images/Eckhart Tolle.jpg",
      title: "Eckhart Tolle",
      description: "Eckhart Tolle is a spiritual teacher known for 'The Power of Now' and 'A New Earth'. He emphasizes living in the present moment and transcending ego-based consciousness."
    },
    {
      image: "/images/Thich Nhat Hanh.jpg",
      title: "Thich Nhat Hanh",
      description: "Thich Nhat Hanh was a Vietnamese Thiền Buddhist monk, peace activist, and founder of the Plum Village Tradition. Known for mindfulness teachings and engaged Buddhism."
    },
    {
      image: "/images/Dalai Lama.jpg",
      title: "Dalai Lama",
      description: "The 14th Dalai Lama, Tenzin Gyatso, is Tibet's spiritual leader and a globally respected figure promoting peace, compassion, and harmony among all faiths."
    },
    {
      image: "/images/osho.jpg",
      title: "Osho",
      description: "Osho, formerly known as Bhagwan Shree Rajneesh, was an Indian mystic and spiritual leader. His teachings blend Eastern mysticism with Western philosophy and psychology."
    },
    {
      image: "/images/Andrew Huberman.jpg",
      title: "Andrew Huberman",
      description: "Dr. Andrew Huberman is a neuroscientist and professor at Stanford School of Medicine. He hosts the popular Huberman Lab podcast, focusing on neuroscience and practical applications."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <CardCarousel cards={gurus} />
    </div>
  );
};

export default GuruCardSwiper;
