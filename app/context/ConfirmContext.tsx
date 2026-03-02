"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

export interface Confirmation {
  id: string;
  name: string;
  phone: string;
  attending: boolean;
  adults: number;
  children: number;
}

interface RawConfirmation {
  _id?: string;
  id?: string;
  name: string;
  phone: string;
  attending: boolean;
  adults: number;
  children: number;
}

interface ConfirmContextType {
  confirmations: Confirmation[];
  isLoading: boolean;
  error: string | null;
  addConfirmation: (data: Omit<Confirmation, "id">) => Promise<void>;
  removeConfirmation: (id: string) => Promise<void>;
  updateConfirmation: (id: string, updates: Partial<Confirmation>) => Promise<void>;
  refreshConfirmations: () => Promise<void>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

const ATTENDANCE_API_BASE =
  process.env.NEXT_PUBLIC_ATTENDANCE_API_URL || "http://localhost:3001/api/attendance";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

const commonHeaders: HeadersInit = {
  "Content-Type": "application/json",
  ...(API_KEY && { "x-api-key": API_KEY }),
};

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConfirmations = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(ATTENDANCE_API_BASE, {
        headers: commonHeaders,
        signal,
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "Sem corpo");
        throw new Error(`HTTP ${res.status} - ${errText}`);
      }

      const rawData = await res.json() as RawConfirmation[];

      // Normaliza id/_id para evitar warnings e erros
      const normalized = rawData.map((item: RawConfirmation) => ({
        id: item._id || item.id || "",
        name: item.name,
        phone: item.phone,
        attending: item.attending,
        adults: item.adults,
        children: item.children,
      }));

      setConfirmations(normalized);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      const message = err instanceof Error ? err.message : "Erro ao carregar confirmações";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("isAdmin")) return;

    const controller = new AbortController();
    fetchConfirmations(controller.signal);
    return () => controller.abort();
  }, [fetchConfirmations]);

  const addConfirmation = async (data: Omit<Confirmation, "id">) => {
    if (!data.name.trim() || !data.phone.trim()) throw new Error("Nome e telefone são obrigatórios");

    const payload = {
      name: data.name.trim(),
      phone: data.phone.trim().replace(/\D/g, ""),
      attending: data.attending,
      adults: Number(data.adults) || 0,
      children: Number(data.children) || 0,
    };

    const res = await fetch(ATTENDANCE_API_BASE, {
      method: "POST",
      headers: commonHeaders,
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Falha ao adicionar");

    const newRaw = await res.json() as RawConfirmation;
    const newItem: Confirmation = {
      id: newRaw._id || newRaw.id || "",
      name: newRaw.name,
      phone: newRaw.phone,
      attending: newRaw.attending,
      adults: newRaw.adults,
      children: newRaw.children,
    };
    setConfirmations((prev) => [...prev, newItem]);
  };

  const removeConfirmation = async (id: string) => {
    if (!id) throw new Error("ID inválido");

    const res = await fetch(`${ATTENDANCE_API_BASE}/${id}`, {
      method: "DELETE",
      headers: commonHeaders,
    });

    if (!res.ok) throw new Error("Falha ao remover");

    setConfirmations((prev) => prev.filter((c) => c.id !== id));
  };

  
  const updateConfirmation = async (id: string, updates: Partial<Confirmation>) => {
    if (!id) throw new Error("ID inválido");

    const res = await fetch(`${ATTENDANCE_API_BASE}/${id}`, {
      method: "PATCH",           
      headers: commonHeaders,
      body: JSON.stringify(updates),
    });

    if (!res.ok) throw new Error("Falha ao atualizar");

    const updatedRaw = await res.json() as RawConfirmation;
    const updated: Confirmation = {
      id: updatedRaw._id || updatedRaw.id || "",
      name: updatedRaw.name,
      phone: updatedRaw.phone,
      attending: updatedRaw.attending,
      adults: updatedRaw.adults,
      children: updatedRaw.children,
    };
    setConfirmations((prev) =>
      prev.map((c) => (c.id === id ? updated : c))
    );
  };

  return (
    <ConfirmContext.Provider
      value={{
        confirmations,
        isLoading,
        error,
        addConfirmation,
        removeConfirmation,
        updateConfirmation,
        refreshConfirmations: () => fetchConfirmations(),
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}

export function useConfirmations() {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error("useConfirmations deve ser usado dentro de ConfirmProvider");
  return context;
}