"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type DemoUser = {
  name: string;
  email: string;
};

type DemoAuthContextValue = {
  user: DemoUser | null;
  login: (email: string) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
};

const DemoAuthContext = createContext<DemoAuthContextValue | null>(null);

// Учебный прототип: пользователь живёт только в памяти вкладки,
// пароль сюда не передаётся и нигде не сохраняется.
export default function DemoAuthProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<DemoUser | null>(null);

  const value = useMemo<DemoAuthContextValue>(
    () => ({
      user,
      login(email) {
        const name = email.split("@")[0]?.trim() || "Читатель";
        setUser({ name, email });
      },
      register(name, email) {
        setUser({ name: name.trim(), email });
      },
      logout() {
        setUser(null);
      },
    }),
    [user],
  );

  return (
    <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>
  );
}

export function useDemoAuth(): DemoAuthContextValue {
  const context = useContext(DemoAuthContext);

  if (!context) {
    throw new Error("useDemoAuth должен использоваться внутри DemoAuthProvider");
  }

  return context;
}
