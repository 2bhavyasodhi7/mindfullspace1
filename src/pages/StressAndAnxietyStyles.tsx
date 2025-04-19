
import React from 'react';
import styles from './StressAndAnxiety.module.css';

export const applyStressPageStyles = () => {
  const stressPage = document.querySelector('.stress-anxiety-page');
  if (stressPage) {
    stressPage.classList.add(styles.stressPageBackground);
    
    const sections = stressPage.querySelectorAll('section');
    sections.forEach((section, index) => {
      section.classList.add(styles.softShadow);
      section.classList.add(styles.hoverEffect);
      section.classList.add(styles.fadeInSection);
      
      if (index % 2 === 0) {
        section.classList.add(styles.floatingElement);
      }
    });
  }
};
