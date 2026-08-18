"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

interface ContactSheetContextValue {
  isOpen: boolean;
  nameInputRef: RefObject<HTMLInputElement | null>;
  openContactSheet: () => void;
  closeContactSheet: () => void;
}

const ContactSheetContext = createContext<ContactSheetContextValue | null>(
  null
);

export function ContactSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  return (
    <ContactSheetContext.Provider
      value={{
        isOpen,
        nameInputRef,
        openContactSheet: () => setIsOpen(true),
        closeContactSheet: () => setIsOpen(false),
      }}
    >
      {children}
    </ContactSheetContext.Provider>
  );
}

export function useContactSheet() {
  const ctx = useContext(ContactSheetContext);
  if (!ctx)
    throw new Error(
      "useContactSheet must be used within a ContactSheetProvider"
    );
  return ctx;
}
