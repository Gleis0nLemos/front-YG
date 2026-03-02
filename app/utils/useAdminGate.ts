'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function useAdminGate() {
  const searchParams = useSearchParams();

  const isAdmin = typeof window !== 'undefined' && (
    searchParams.get('admin') === '2026yg' ||
    localStorage.getItem('isAdmin') === 'true'
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (searchParams.get('admin') === '2026yg') {
      localStorage.setItem('isAdmin', 'true');

      // Limpeza assíncrona da URL
      const timer = setTimeout(() => {
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState(null, '', newUrl);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return { isAdmin };
}