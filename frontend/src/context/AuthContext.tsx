import { useState } from "react";
import type { ReactNode } from "react";

import { AuthContext } from "./auth-context";

interface Props {
  children: ReactNode;
}

export function AuthProvider({
  children
}: Props) {

  const [token, setToken] =
    useState<string | null>(
      localStorage.getItem(
        "accessToken"
      )
    );

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}