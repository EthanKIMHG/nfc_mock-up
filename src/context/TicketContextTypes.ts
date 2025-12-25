import { createContext, useContext } from 'react';

export interface TicketContextType {
  enteredCount: number;
  incrementEntered: () => void;
}

export const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function useTicketContext() {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTicketContext must be used within a TicketProvider");
  }
  return context;
}
