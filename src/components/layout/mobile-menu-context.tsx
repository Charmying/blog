"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type MobileMenuContextValue = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

const MobileMenuContext = createContext<MobileMenuContextValue | null>(null);

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <MobileMenuContext value={{ open, toggle, close }}>
      {children}
    </MobileMenuContext>
  );
}

export function useMobileMenu() {
  const ctx = useContext(MobileMenuContext);
  if (!ctx) throw new Error("useMobileMenu must be used within MobileMenuProvider");
  return ctx;
}
