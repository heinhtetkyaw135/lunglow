import { useState, useEffect } from 'react';

export function useExerciseTimer(initialSeconds, onComplete) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isActive, onComplete]);

  const reset = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };

  const toggle = () => setIsActive((prev) => !prev);

  return {
    seconds,
    isActive,
    setIsActive,
    setSeconds,
    reset,
    toggle,
  };
}
