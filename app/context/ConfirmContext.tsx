"use client";

import { createContext, useContext, useState } from "react";

export type Confirmation = {
  id: number;
  name: string;
  going: boolean;
  adults: number;
  kids: number;
};

type ContextType = {
  confirmations: Confirmation[];
  addConfirmation: (data: Omit<Confirmation, "id">) => void;
  removeConfirmation: (id: number) => void;
  updateConfirmation: (id: number, data: Partial<Confirmation>) => void;
};

const ConfirmContext = createContext<ContextType | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [confirmations, setConfirmations] = useState<Confirmation[]>([
    {
      id: 1,
      name: "Maria Silva",
      going: true,
      adults: 2,
      kids: 1,
    },
    {
      id: 2,
      name: "Ana & Carlos",
      going: false,
      adults: 0,
      kids: 0,
    },
  ]);

  function addConfirmation(data: Omit<Confirmation, "id">) {
    setConfirmations((prev) => [
      ...prev,
      { id: Date.now(), ...data },
    ]);
  }

  function removeConfirmation(id: number) {
    setConfirmations((prev) =>
      prev.filter((c) => c.id !== id)
    );
  }

  function updateConfirmation(
    id: number,
    data: Partial<Confirmation>
  ) {
    setConfirmations((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...data } : c
      )
    );
  }

  return (
    <ConfirmContext.Provider
      value={{
        confirmations,
        addConfirmation,
        removeConfirmation,
        updateConfirmation,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}

export function useConfirmations() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error("useConfirmations must be inside ConfirmProvider");
  }
  return ctx;
}
