import { useState, useEffect, useCallback } from 'react';

export function useSlideNav(totalSlides = 11) {
  const [currentSlide, setCurrentSlide] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#slide', '');
      const parsed = parseInt(hash, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= totalSlides) {
        return parsed;
      }
    }
    return 1;
  });

  const goToSlide = useCallback((index) => {
    if (index >= 1 && index <= totalSlides) {
      setCurrentSlide(index);
      if (typeof window !== 'undefined') {
        window.location.hash = `slide${index}`;
      }
    }
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, totalSlides, toggleFullscreen]);

  return {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    toggleFullscreen,
    totalSlides
  };
}

export default useSlideNav;
