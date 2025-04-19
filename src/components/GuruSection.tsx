
import React from "react";
import { motion } from "framer-motion";
import GuruCardSwiper from "./GuruCardSwiper";

const GuruSection = () => {
  return (
    <section 
      id="gurus" 
      className="py-16 md:py-24 bg-gradient-to-br from-mindful-lighter to-white"
    >
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-mindful-dark to-amber-500 bg-clip-text text-transparent">
              Gurus & The Science Behind
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-700 max-w-2xl mx-auto"
          >
            Learn from the world's most respected meditation teachers and scientific researchers who have dedicated their lives to understanding the profound benefits of mindfulness practices.
          </motion.p>
        </div>
        
        <GuruCardSwiper />

        <div className="mt-16 bg-gradient-to-br from-mindful-lighter to-white rounded-2xl p-6 md:p-10 shadow-lg border border-mindful/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-3xl font-bold mb-4"
              >
                <span className="bg-gradient-to-r from-mindful-dark to-amber-500 bg-clip-text text-transparent">
                  The Scientific Evidence
                </span>
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-700 mb-4"
              >
                Modern science has validated what ancient wisdom traditions have taught for centuries. Regular meditation practice has been shown to:
              </motion.p>
              <ul className="space-y-2 text-gray-700">
                <motion.li 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-start"
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-mindful-light text-mindful-dark flex items-center justify-center mr-2">✓</span>
                  <span>Reduce stress and anxiety levels</span>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-start"
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-mindful-light text-mindful-dark flex items-center justify-center mr-2">✓</span>
                  <span>Improve focus and attention span</span>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex items-start"
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-mindful-light text-mindful-dark flex items-center justify-center mr-2">✓</span>
                  <span>Enhance emotional regulation and resilience</span>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex items-start"
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-mindful-light text-mindful-dark flex items-center justify-center mr-2">✓</span>
                  <span>Lower blood pressure and improve cardiovascular health</span>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex items-start"
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-mindful-light text-mindful-dark flex items-center justify-center mr-2">✓</span>
                  <span>Support neuroplasticity and cognitive functioning</span>
                </motion.li>
              </ul>
            </div>
            <div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                <img 
                  src="https://images.pexels.com/photos/18069424/pexels-photo-18069424/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-how-ai-could-assist-in-genomic-studies-and-its-applications-it-was-created-by-artist-nidia-dias-as-part-of-the.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Scientific evidence of meditation" 
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuruSection;
