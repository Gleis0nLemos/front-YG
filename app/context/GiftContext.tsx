"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";

const GIFT_API_BASE = process.env.NEXT_PUBLIC_GIFT_API_URL || "http://localhost:3001/api/gift";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

if (!process.env.NEXT_PUBLIC_GIFT_API_URL) {
  console.warn("NEXT_PUBLIC_GIFT_API_URL não definida. Usando fallback:", GIFT_API_BASE);
}

interface GiftFromAPI {
  _id: string;
  name: string;
  description?: string;
  productUrl?: string;
  imageUrl?: string;
  reserved: boolean;
  reservedByName?: string;
  reservedByPhone?: string;
}

export type Gift = GiftFromAPI;

const commonHeaders: HeadersInit = {
  "Content-Type": "application/json",
  ...(API_KEY && { "x-api-key": API_KEY }),
};

type GiftContextType = {
  gifts: Gift[];
  loading: boolean;
  error: string | null;
  addGift: (data: { name: string; description: string; productUrl: string; imageUrl: string }) => Promise<void>;
  reserveGift: (giftId: string, reserverName: string, reserverPhone: string) => Promise<void>;
  updateGift: (giftId: string, data: Partial<Gift>) => Promise<void>;
  deleteGift: (giftId: string) => Promise<void>;
  refreshGifts: () => Promise<void>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  paginatedGifts: Gift[];
  itemsPerPage: number;
};

const GiftContext = createContext<GiftContextType | undefined>(undefined);

export function GiftProvider({ children }: { children: ReactNode }) {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const fetchGifts = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(GIFT_API_BASE, {
        headers: commonHeaders,
        signal,
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: Gift[] = await res.json();
      setGifts(data);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      const message = err instanceof Error ? err.message : "Erro ao carregar presentes";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchGifts(controller.signal);
    return () => controller.abort();
  }, []);

  // Calcula o total de páginas (com useMemo)
  const totalPages = Math.ceil(gifts.length / itemsPerPage);

  // Ajusta página atual se necessário
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
    if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedGifts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return gifts.slice(start, end);
  }, [gifts, currentPage, itemsPerPage]);

  const addGift = async (data: { name: string; description: string; productUrl: string; imageUrl: string }) => {
    if (!data.name.trim()) throw new Error("Nome obrigatório");

    const payload = { ...data, reserved: false };
    const res = await fetch(GIFT_API_BASE, { method: "POST", headers: commonHeaders, body: JSON.stringify(payload) });
    if (!res.ok) throw new Error("Falha ao adicionar");

    const newGift = await res.json();
    setGifts((prev) => [...prev, newGift]);
    setCurrentPage(1);
    setTimeout(fetchGifts, 300);
  };

  const reserveGift = async (giftId: string, reserverName: string, reserverPhone: string) => {
    const res = await fetch(`${GIFT_API_BASE}/${giftId}`, {
      method: "PATCH",
      headers: commonHeaders,
      body: JSON.stringify({
        reserved: true,
        reservedByName: reserverName.trim(),
        reservedByPhone: reserverPhone.trim(),
      }),
    });
    if (!res.ok) throw new Error("Falha ao reservar");

    setGifts((prev) =>
      prev.map((g) =>
        g._id === giftId
          ? { ...g, reserved: true, reservedByName: reserverName.trim(), reservedByPhone: reserverPhone.trim() }
          : g
      )
    );
    setTimeout(fetchGifts, 300);
  };

  const updateGift = async (giftId: string, data: Partial<Gift>) => {
    const res = await fetch(`${GIFT_API_BASE}/${giftId}`, {
      method: "PATCH",
      headers: commonHeaders,
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Falha ao atualizar");

    setGifts((prev) => prev.map((g) => (g._id === giftId ? { ...g, ...data } : g)));
    setTimeout(fetchGifts, 300);
  };

  const deleteGift = async (giftId: string) => {
    const res = await fetch(`${GIFT_API_BASE}/${giftId}`, {
      method: "DELETE",
      headers: commonHeaders,
    });
    if (!res.ok) throw new Error("Falha ao deletar");

    setGifts((prev) => prev.filter((g) => g._id !== giftId));
    setTimeout(fetchGifts, 300);
  };

  return (
    <GiftContext.Provider
      value={{
        gifts,
        loading,
        error,
        addGift,
        reserveGift,
        updateGift,
        deleteGift,
        refreshGifts: fetchGifts,
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedGifts,
        itemsPerPage,
      }}
    >
      {children}
    </GiftContext.Provider>
  );
}

export function useGifts() {
  const context = useContext(GiftContext);
  if (!context) throw new Error("useGifts deve ser usado dentro de GiftProvider");
  return context;
}