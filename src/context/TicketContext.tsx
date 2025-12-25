import { type ReactNode, useEffect, useState } from 'react';
import { TicketContext } from './TicketContextTypes';

export function TicketProvider({ children }: { children: ReactNode }) {
  const [enteredCount, setEnteredCount] = useState<number>(() => {
    // Initializer function for lazy loading from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("enteredCount");
      return saved ? parseInt(saved, 10) : 1240; // Default mock value if null
    }
    return 1240;
  });

  useEffect(() => {
    localStorage.setItem("enteredCount", enteredCount.toString());
  }, [enteredCount]);

  const incrementEntered = () => {
    setEnteredCount((prev) => prev + 1);
  };

  return (
    <TicketContext.Provider value={{ enteredCount, incrementEntered }}>
      {children}
    </TicketContext.Provider>
  );
}
